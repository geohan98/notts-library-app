const { models } = require("../config/database");
import { Request, Response } from "express";

const NewWithdrawsApi = () => {
	const GetAllWithdraws = (req: Request, res: Response) => {
		models.withdraw
			.findAll({
				include: [
					{
						model: models.copy,
						as: "copy",
						include: [{ model: models.book, as: "book" }],
					},
				],
			})
			.then((withdraws: any) => {
				console.log(withdraws);
				res.send(withdraws);
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const CreateNewWithdraw = (req: Request, res: Response) => {
		let { copy_id, user_name } = req.body;

		models.withdraw
			.create({
				copy_id,
				date_out: new Date(),
				user_name,
			})
			.then(() => res.sendStatus(200))
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const GetWithdrawById = (req: Request, res: Response) => {
		models.withdraw
			.findByPk(parseInt(req.params.id))
			.then((row: any) => {
				if (row) {
					res.send(row);
				} else {
					res.sendStatus(400);
				}
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	const UpdateWithdrawById = (req: Request, res: Response) => {
		models.withdraw
			.findByPk(parseInt(req.params.id))
			.then((row: any) => {
				if (row) {
					row.update({ date_in: new Date() });
					res.send(row);
				} else {
					res.sendStatus(400);
				}
			})
			.catch((err: any) => {
				console.log("Error: " + err);
				res.sendStatus(400);
			});
	};

	return { GetAllWithdraws, CreateNewWithdraw, GetWithdrawById, UpdateWithdrawById };
};

export = NewWithdrawsApi;
