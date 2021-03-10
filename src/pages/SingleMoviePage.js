import React, { useState, useEffect } from "react";

import Layout from "../features/layout/Layout";
import MovieProfile from "../features/movies/MovieProfile";

const SingleMoviePage = ({ match }) => {
	const { movie_id } = match.params;
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		const fetchMovie = async () => {
			const response = await fetch(`http://localhost:3001/movie/${movie_id}`);
			const data = await response.json();

			setMovie(data);
		};

		fetchMovie();
	}, [movie_id]);

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<Layout>
			<MovieProfile movie={movie} />
		</Layout>
	);
};

export default SingleMoviePage;
