import express from "express";
const cors = require("cors");

import ApiErrorHandler from "./middleware/api-error-handler";

import newBookRouter from "./routes/book";
import newCopyRouter from "./routes/copy";
import newBooksTagRouter from "./routes/books_tag";
import newWithdrawsRouter from "./routes/widthdraw";
import newTagRouter from "./routes/tag";
import newPurchaseRequestRouter from "./routes/purchaseRequest";

import newBookService from "./service/book-service";

//Create Express App
const app = express();

//Using JSON body parser middleware to recive body data
app.use(express.json());

//CORS Middleware
app.use(
	cors({
		origin: "*",
	})
);

// Express Routes
app.use("/book", newBookRouter(newBookService()));
app.use("/copy", newCopyRouter());
app.use("/withdraw", newWithdrawsRouter());
app.use("/tag", newTagRouter());
app.use("/books_tag", newBooksTagRouter());
app.use("/request", newPurchaseRequestRouter());

//Error Handle Middleware
app.use(ApiErrorHandler);

export default app;
