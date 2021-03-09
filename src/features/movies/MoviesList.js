import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "./MovieCard";
import { selectAllMovies, fetchMovieList } from "./moviesSlice";

const MoviesList = () => {
	const dispatch = useDispatch();
	const movies = useSelector(selectAllMovies);

	const moviesStatus = useSelector((state) => state.movies.status);
	const error = useSelector((state) => state.movies.error);

	useEffect(() => {
		if (moviesStatus === "idle") {
			dispatch(fetchMovieList("top_rated"));
		}
	}, [moviesStatus, dispatch]);

	let content = null;

	if (moviesStatus === "loading") {
		content = <div className="loader">Loading...</div>;
	} else if (moviesStatus === "succeeded") {
		content = movies.map((movie) => <MovieCard key={movie.id} movie={movie} />);
	} else if (moviesStatus === "failed") {
		content = <div>{error}</div>;
	}

	return <section>{content}</section>;
};

export default MoviesList;
