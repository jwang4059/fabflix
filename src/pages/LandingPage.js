import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import { NoMovies } from "../components/Placeholder";
import MovieCard from "../features/movies/MovieCard";
import MovieBanner from "../features/movies/MovieBanner";
import HorizontalScrollContainer from "../components/HorizonalScrollContainer";

const useStyles = makeStyles((theme) => ({
	semiBold: {
		fontWeight: 600,
	},
	verticalMargins: {
		margin: "2rem 0",
	},
}));

const Movies = ({ classes, movies }) => {
	const movieCards = movies.results.map((movie) => {
		return <MovieCard key={movie.id} movie={movie} />;
	});

	return (
		<section className={classes.verticalMargins}>
			<Typography className={classes.semiBold}>Popular:</Typography>
			{movieCards && movieCards.length > 0 ? (
				<HorizontalScrollContainer>{movieCards}</HorizontalScrollContainer>
			) : (
				<NoMovies width="100%" height="16rem" />
			)}
		</section>
	);
};

const LandingPage = () => {
	const classes = useStyles();
	const [randomMovie, setRandomMovie] = useState(null);
	const [popularMovies, setPopularMovies] = useState(null);

	useEffect(() => {
		const fetchRandomMovie = async () => {
			const response = await fetch(
				`https://fabflix-api.herokuapp.com/random/now_playing`
			);
			const data = await response.json();

			setRandomMovie(data);
		};

		const fetchPopularMovies = async () => {
			const response = await fetch(
				`https://fabflix-api.herokuapp.com/movielist/popular`
			);
			const data = await response.json();

			setPopularMovies(data);
		};

		fetchRandomMovie();
		fetchPopularMovies();
	}, []);

	if (!randomMovie || !popularMovies) {
		return <Loading />;
	}

	return (
		<>
			<MovieBanner movie={randomMovie} />
			<Movies classes={classes} movies={popularMovies} />
		</>
	);
};

export default LandingPage;
