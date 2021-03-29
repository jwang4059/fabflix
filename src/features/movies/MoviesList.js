import React from "react";

import MovieListItem from "./MovieListItem";

const MoviesList = ({ movies, show }) => {
	const renderedMovies = movies.map((movie) => (
		<MovieListItem key={movie.id} movie={movie} show={show} />
	));

	return <section>{renderedMovies}</section>;
};

export default MoviesList;
