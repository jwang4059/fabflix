import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import MovieListBackButton from "../components/MovieListBackButton";
import MoviesList from "../features/movies/MoviesList";
import {
	fetchBookmarks,
	selectAllBookmarks,
} from "../features/bookmarks/bookmarksSlice";

const useStyles = makeStyles((theme) => ({
	title: {
		fontSize: "2.25rem",
		lineHeight: "2.5rem",
		fontWeight: "700",
		margin: "1rem 0",
	},
}));

const BookmarksPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.authentification.user.id);
	const bookmarks = useSelector(selectAllBookmarks);
	const bookmarksStatus = useSelector((state) => state.bookmarks.status);
	const bookmarksError = useSelector((state) => state.bookmarks.error);
	const [movies, setMovies] = useState([]);
	const [moviesError, setMoviesError] = useState(null);

	useEffect(() => {
		const fetchBookmarkMovies = async () => {
			const movieIds = bookmarks.map((bookmark) => bookmark.movieid);

			try {
				const response = await fetch(
					"https://fabflix-api.herokuapp.com/bookmarks/movies",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ movieIds }),
					}
				);

				const data = await response.json();

				setMovies(data);
			} catch (e) {
				setMoviesError(e);
			}
		};

		if (bookmarksStatus === "idle") dispatch(fetchBookmarks({ userId }));
		if (bookmarksStatus === "succeeded") fetchBookmarkMovies();
	}, [dispatch, userId, bookmarks, bookmarksStatus]);

	if (bookmarksError) return <div>Bookmarks Error: {bookmarksError}</div>;
	if (moviesError) return <div>Movies Error: {moviesError}</div>;
	if (!movies) return <Loading />;

	const bookmarkIds = bookmarks.map((bookmark) => bookmark.bookmarkid);

	return (
		<Container component="main" maxWidth="md">
			<Typography className={classes.title} component="h1">
				My Bookmarks
			</Typography>
			<MoviesList movies={movies} bookmarkIds={bookmarkIds} />
			<MovieListBackButton />
		</Container>
	);
};

export default BookmarksPage;
