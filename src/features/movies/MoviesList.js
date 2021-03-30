import React from "react";

import MovieListItem from "./MovieListItem";

const MoviesList = ({ movies, bookmarkIds }) => {
	const renderedMovies = movies.map((movie, i) => {
		if (bookmarkIds) {
			return (
				<MovieListItem key={i} movie={movie} bookmarkId={bookmarkIds[i]} />
			);
		} else {
			return <MovieListItem key={i} movie={movie} />;
		}
	});

	return <section>{renderedMovies}</section>;
};

export default MoviesList;
