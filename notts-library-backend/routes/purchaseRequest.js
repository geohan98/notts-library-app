const express = require("express");
const router = express.Router();
const { models } = require("../config/database");

//Get All Purchase Requests
router.get("/", (req, res) => {
	models.request
		.findAll({
			include: [
				{ model: models.book, as: "book" },
			],
		})
		.then((requests) => {
			console.log(requests);
			res.send(requests);
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.status(400).send("Could Not Find Any Copies");
		});
});

//Add New Purchase Request
router.post("/", (req, res) => {
	const { title, iban, author, type, category, cover_photo, description, tags, user } =
		req.body;

	models.book
		.create({
			title,
			iban,
			author,
			type,
			category,
			cover_photo,
			description,
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		})
		.then((book) => {
			tags.map((tagObj) => {

				return (

					models.tag.findOrCreate({
						where: {
							name: tagObj.tag_name
						}
					}).then((foundTag) => {
						models.books_tag.create({
							book_id: book.id,
							tag_id: foundTag[0].id,
						})
							.catch((err) => {
								console.log("Error: " + err);
								res.sendStatus(400);
							});
					})

				)
			})

			models.request
				.create({
					book_id: book.id,
					requestedBy: "Moeez (test)",
					request_date: new Date()
				})
				.catch((err) => {
					console.log("Error: " + err);
					res.sendStatus(400);
				});


		})

		.then(() => res.send("OK"))
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		});



});




//Update A Prurchase Request
router.put("/:id", (req, res) => {
	models.request
		.findByPk(parseInt(req.params.id))
		.then((request) => {
			if (request) {
				request.update({
					fulfill_date: new Date()
				})

				models.copy
					.create({
						book_id: request.book_id,
						owner: "BJSS",
					})
					.then(() => res.sendStatus(200))
					.catch((err) => {
						console.log("Error: " + err);
						res.status(400).send("Could Not Add A Copy");
					});
			}
		})
		.catch((err) => {
			console.log("Error: " + err);
			res.sendStatus(400);
		})
});

module.exports = router;
