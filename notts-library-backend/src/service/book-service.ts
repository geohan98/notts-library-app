const { models } = require("../database/database");
import sequelize from "../database/database";
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

import IBook from "../interfaces/IBook";
import ITag from "../interfaces/ITag";

const newBookService = () => {
	const searchBooks = async (term: any): Promise<any> => {
		return await models.book.findAll({
			where: {
				[Op.or]: [{ title: { [Op.like]: "%" + term + "%" } }, { author: { [Op.like]: "%" + term + "%" } }, { ISBN: { [Op.like]: "%" + term + "%" } }, { category: { [Op.like]: "%" + term + "%" } }, { type: { [Op.like]: "%" + term + "%" } }],
			},
		});
	};

	const getAllBooks = async (): Promise<any> => {
		let result = await models.book.findAll({
			include: [
				{ model: models.request, as: "requests" },
				{ model: models.copy, as: "copies" },
			],
		});

		result = result.filter((book: any) => {
			return book.copies.length > 0;
		});

		return result;
	};

	const getBookByID = async (id: any): Promise<any> => {
		const result = await models.book.findByPk(id, { paranoid: false });

		if (result == null) {
			throw new Error("Unable To Find Book With ID");
		}

		return result;
	};

	const createNewBook = async (book: IBook): Promise<any> => {
		let bk: any;
		let tags: any;
		let copy: any;

		await sequelize.transaction(async () => {
			bk = await models.book.create({
				title: book.title,
				ISBN: book.ISBN,
				author: book.author,
				type: book.type,
				category: book.category,
				cover_photo: book.cover_photo,
				description: book.description,
			});

			let tags;
			if (book.tags) {
				tags = await createTags(bk.id, book.tags);
			}

			copy = await createCopy(bk.id, book.owner);
		});

		return { bk, tags, copy };
	};

	// Pulled out from create new book function
	const createCopy = async (id: any, owner: String): Promise<any> => {
		return await models.copy.create({
			book_id: id,
			owner: owner,
		});
	};

	// Pulled out from create new book function
	const createTags = async (id: any, tags: ITag[]): Promise<any> => {
		const createdTags: any[] = [];
		const associations: any[] = [];

		tags.forEach(async (tagObj: any) => {
			const createdTag = await models.tag.findOrCreate({
				where: {
					name: tagObj.tag_name,
				},
			});

			const association = await models.books_tag.create({
				book_id: id,
				tag_id: createdTag[0].id,
			});

			createdTags.push(createdTag[0]);
			associations.push(association);
		});

		return { createdTags, associations };
	};

	const updateBookByID = async (id: number, title: string, ISBN: string, author: string, type: string, category: string, cover_photo: string, description: string, tags: any) => {
		const result = models.book.findByPk(id);

		if (result != null) {
			await sequelize.transaction(async () => {
				await result.update({
					title: title || result.title,
					ISBN: ISBN || result.ISBN,
					author: author || result.author,
					type: type || result.type,
					category: category || result.category,
					cover_photo: cover_photo || result.cover_photo,
					description: description || result.description,
				});
			});
		} else {
			throw new Error("Unable To Find Book With ID");
		}

		//CURRENTLY DOES NOT DELETE ALREADY EXISTING TAGS
		tags.map(async (tagObj: any) => {
			const tag = await models.tag.findOrCreate({
				where: {
					name: tagObj.tag_name,
				},
			});

			await models.books_tag.create({
				book_id: id,
				tag_id: tag[0].id,
			});
		});

		return result;
	};

	const getCopiesByBookID = async (id: any) => {
		return await models.book.findByPk(parseInt(id), {
			include: [{ model: models.copy, as: "copies" }],
		});
	};

	const getTagsByBookID = async (id: any) => {
		return await models.book.findByPk(parseInt(id), {
			include: [
				{
					model: models.tag,
					as: "tags",
					through: {
						attributes: ["tag_id", "book_id"],
					},
				},
			],
		});
	};

	const deleteBookByID = async (id: number) => {
		const result = await models.book.findByPk(id);

		if (result == null) {
			throw new Error("Unable To Find Book With ID");
		}

		await sequelize.transaction(async () => {
			result.destroy();
		});

		return result;
	};

	return {
		getAllBooks,
		searchBooks,
		getBookByID,
		createNewBook,
		updateBookByID,
		getCopiesByBookID,
		getTagsByBookID,
		deleteBookByID,
	};
};

export default newBookService;
