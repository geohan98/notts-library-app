import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="card flex justify-between">
			<div className="flex flex-col justify-around ">
				<h1 className="text-2xl font-bold">BookWorm</h1>
			</div>
			<div className="flex flex-col justify-around ">
				<nav className="flex gap-4">
					<Link className="nav-button" to={"/"}>
						<h2>Home</h2>
					</Link>
					<Link to={"/Search"}>
						<h2 className="nav-button">Search</h2>
					</Link>
					<Link to={"/AddBook"}>
						<h2 className="nav-button">Add A Book</h2>
					</Link>
					<Link to={"/Requests"}>
						<h2 className="nav-button">Book Requests</h2>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
