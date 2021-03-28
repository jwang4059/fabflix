import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import MoviesList from "../features/movies/MoviesList";
import { selectAllBookmarks } from "../features/bookmarks/bookmarksSlice";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: "2.25rem",
		lineHeight: "2.5rem",
		fontWeight: "700",
	},
}));

const BookmarksPage = () => {
	const classes = useStyles();
	const bookmarks = useSelector(selectAllBookmarks);
	const bookmarksStatus = useSelector((state) => state.bookmarks.status);
	const bookmarksError = useSelector((state) => state.bookmarks.error);
	const [movies, setMovies] = useState([]);
	const [moviesError, setMoviesError] = useState(null);

	useEffect(() => {
		const fetchBookmarkMovies = async () => {
			try {
				const response = await fetch(
					"https://fabflix-api.herokuapp.com/movies/bookmarks",
					{
						method: "GET",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ bookmarks }),
					}
				);

				const data = await response.json();

				setMovies(data);
			} catch (e) {
				setMoviesError(e);
			}
		};

		if (bookmarksStatus === "succeeded") fetchBookmarkMovies();
	}, [bookmarks, bookmarksStatus]);

	if (bookmarksError) return <div>Bookmarks Error: {bookmarksError}</div>;
	if (moviesError) return <div>Movies Error: {moviesError}</div>;
	if (!movies) return <Loading />;

	return (
		<Container component="main" maxWidth="md">
			<Typography className={classes.title} component="h1">
				My Bookmarks
			</Typography>
			<MoviesList movies={movies} show={false} />
		</Container>
	);
};

export default BookmarksPage;
