import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import MoviesList from "../features/movies/MoviesList";
import Pagination from "../components/Pagination";
import {
	selectAllMovies,
	fetchMovieList,
} from "../features/movies/moviesSlice";

const MovieListPage = () => {
	const { id } = useParams();
	const search = useLocation().search;

	const dispatch = useDispatch();
	const movies = useSelector(selectAllMovies);

	const moviesStatus = useSelector((state) => state.movies.status);
	const error = useSelector((state) => state.movies.error);

	useEffect(() => {
		const payload = {
			param: id ? `/${id}` : "",
			search: search ? search : "",
		};

		dispatch(fetchMovieList(payload));
	}, [id, search, dispatch]);

	let content = null;

	if (moviesStatus === "loading") {
		content = <Loading />;
	} else if (moviesStatus === "succeeded") {
		content = (
			<>
				<MoviesList movies={movies} />
				<Pagination />
			</>
		);
	} else if (moviesStatus === "failed") {
		content = <div>{error}</div>;
	}

	return content;
};

export default MovieListPage;
