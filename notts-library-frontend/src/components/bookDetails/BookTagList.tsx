import { useState, useEffect } from "react";
import IBook from "../../interfaces/IBook";
import ITag from "../../interfaces/ITag";
import Tag from "./Tag";

const BookTagsList = ({ book }: { book: IBook }) => {
	const [tags, setTags] = useState<ITag[]>();
	useEffect(() => {
		getBook();
	}, []);

	const getBook = async () => {
		const res = await fetch(process.env.REACT_APP_BASE_URL + `/book/${book.id}/tags`);
		const data = await res.json();
		setTags(data.tags);
	};

	const renderedCopies = tags?.map((tag) => {
		return <Tag key={tag.id} tag={tag.name} />;
	});

	return (
		<div className="card">
			<h1 className="text-lg font-bold">{tags ? `Tags: ${tags.length}` : "Tags: 0"}</h1>
			<div className="flex flex-wrap">{renderedCopies}</div>
		</div>
	);
};

export default BookTagsList;
