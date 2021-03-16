import React from "react";

import MovieListItem from "./MovieListItem";

const MoviesList = ({ movies }) => {
	const renderedMovies = movies.map((movie) => (
		<MovieListItem key={movie.id} movie={movie} />
	));

	return <section>{renderedMovies}</section>;
};

export default MoviesList;
