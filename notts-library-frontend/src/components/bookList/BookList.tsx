import BookListCard from "./BookListCard";
import IBook from "../../interfaces/IBook";
import { useState, useEffect } from "react";

const BookList = () => {
	const [books, setbooks] = useState<IBook[]>([]);
	useEffect(() => {
		getBooks();
	}, []);

	const getBooks = async () => {
		const res = await fetch(process.env.REACT_APP_BASE_URL + "/book");
		const data = await res.json();
		setbooks(data);
	};

	const renderedItems = books.map((book) => {
		return <BookListCard key={book.id} book={book} />;
	});

	return (
		<div className="card">
			<h1 className="text-xl font-bold m-1">{`Total Books: ${renderedItems.length}`}</h1>
			{renderedItems}
		</div>
	);
};

export default BookList;
