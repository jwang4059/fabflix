import React from "react";

import MovieListItem from "./MovieListItem";

const MoviesList = ({ movies, show }) => {
	const renderedMovies = movies.map((movie, i) => (
		<MovieListItem key={i} movie={movie} show={show} />
	));

	return <section>{renderedMovies}</section>;
};

export default MoviesList;
