import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import MoviesList from "../features/movies/MoviesList";
import {
	selectAllMovies,
	fetchMovieList,
} from "../features/movies/moviesSlice";

const MovieListPage = () => {
	const { id } = useParams();
	const query = useLocation().search;

	const dispatch = useDispatch();
	const movies = useSelector(selectAllMovies);

	const moviesStatus = useSelector((state) => state.movies.status);
	const error = useSelector((state) => state.movies.error);

	useEffect(() => {
		if (moviesStatus === "idle") {
			const payload = {
				param: id ? `/${id}` : "",
				query: query ? query : "",
			};

			dispatch(fetchMovieList(payload));
		}
	}, [moviesStatus, id, query, dispatch]);

	let content = null;

	if (moviesStatus === "loading") {
		content = <Loading />;
	} else if (moviesStatus === "succeeded") {
		content = <MoviesList movies={movies} />;
	} else if (moviesStatus === "failed") {
		content = <div>{error}</div>;
	}

	return content;
};

export default MovieListPage;
