import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import { NoMovie, NoMovies } from "../components/Placeholder";
import MovieCard from "../features/movies/MovieCard";
import HorizontalScrollContainer from "../components/HorizonalScrollContainer";
import { selectImageBaseUrl } from "../features/configuration/configurationSlice";

const useStyles = makeStyles((theme) => ({
	flex: {
		display: "flex",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			marginBottom: theme.spacing(2),
		},
		[theme.breakpoints.up("sm")]: {
			flexShrink: 0,
			marginRight: theme.spacing(2),
		},
	},
	poster: {
		height: "18rem",
		objectFit: "cover",
		boxShadow: theme.shadows[5],
	},
	textContainer: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
		[theme.breakpoints.up("sm")]: {
			padding: "1rem",
		},
	},
	title: {
		fontWeight: 700,
		[theme.breakpoints.down("xs")]: {
			fontSize: "1.5rem",
			lineHeight: "2rem",
		},
		[theme.breakpoints.up("sm")]: {
			fontSize: "2.25rem",
			lineHeight: "2.5rem",
		},
	},
	semiBold: {
		fontWeight: 600,
	},
	verticalMargins: {
		margin: "2rem 0",
	},
}));

const Poster = ({ classes, movie, imageBaseUrl }) => {
	let poster = null;
	if (!movie.poster_path) {
		poster = <NoMovie height={"18rem"} width={"12rem"} />;
	} else {
		const posterUrl = imageBaseUrl + movie.poster_path;
		poster = <img className={classes.poster} src={posterUrl} alt="" />;
	}

	return <div className={classes.imageContainer}>{poster}</div>;
};

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
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const [nowPlayingMovies, setNowPlayingMovies] = useState(null);
	const [popularMovies, setPopularMovies] = useState(null);

	useEffect(() => {
		const fetchNowPlayingMovie = async () => {
			const response = await fetch(
				`http://localhost:3001/movielist/now_playing`
			);
			const data = await response.json();

			setNowPlayingMovies(data);
		};

		const fetchPopularMovies = async () => {
			const response = await fetch(`http://localhost:3001/movielist/popular`);
			const data = await response.json();

			setPopularMovies(data);
		};

		fetchNowPlayingMovie();
		fetchPopularMovies();
	}, []);

	if (!nowPlayingMovies || !popularMovies) {
		return <Loading />;
	}

	const movie = nowPlayingMovies.results[0];

	let backdropStyles = {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		minHeight: "60vh",
		padding: "1rem",
		margin: "2rem 0",
		backgroundColor: "black",
		backgroundPosition: "center center",
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
		color: "white",
	};

	if (movie.backdrop_path) {
		const backdropUrl = imageBaseUrl + movie.backdrop_path;

		backdropStyles = {
			...backdropStyles,
			backgroundImage: `linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
              ), url(${backdropUrl})`,
		};
	}

	return (
		<>
			<section style={backdropStyles}>
				<div className={classes.flex}>
					<Poster classes={classes} movie={movie} imageBaseUrl={imageBaseUrl} />
					<div className={classes.textContainer}>
						<Typography className={classes.title} component="h1">
							{movie.title}
						</Typography>
						<Typography>{movie.overview}</Typography>
					</div>
				</div>
			</section>

			<Movies classes={classes} movies={popularMovies} />
		</>
	);
};

export default LandingPage;
