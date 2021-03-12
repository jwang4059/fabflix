import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import HorizontalScrollContainer from "../components/HorizonalScrollContainer";
import { selectImageBaseUrl } from "../features/configuration/configurationSlice";
import StarCard from "../features/movies/StarCard";

const useStyles = makeStyles((theme) => ({
	backdrop: {
		height: "16rem",
		width: "100%",
		objectFit: "cover",
	},
	main: {
		display: "flex",
		margin: theme.spacing(4, 0),
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
	},
	textContainer: {
		[theme.breakpoints.down("xs")]: {
			padding: 0,
		},
		[theme.breakpoints.up("sm")]: {
			padding: "1rem",
		},
	},
	header: {
		marginBottom: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "flex",
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
	date: {
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		fontWeight: 400,
		color: theme.palette.text.secondary,
	},
	director: {
		fontWeight: 600,
	},
	ratingContainer: {
		display: "flex",
		alignItems: "center",
		marginLeft: "auto",
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(2),
		},
	},
	rating: {
		fontSize: "1.5rem",
		lineHeight: "2rem",
	},
	starsContainer: {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto",
		padding: theme.spacing(1, 0),
	},
	stars: {
		fontWeight: 600,
	},
}));

const Banner = ({ classes, movie, imageBaseUrl }) => {
	const backdropUrl = `${imageBaseUrl}original${movie.backdrop_path}`;

	return (
		<Box component="section" display="flex" justifyContent="center" my={4}>
			<img className={classes.backdrop} src={backdropUrl} alt="" />
		</Box>
	);
};

const Poster = ({ classes, movie, imageBaseUrl }) => {
	const posterUrl = `${imageBaseUrl}original${movie.poster_path}`;

	return (
		<div className={classes.imageContainer}>
			<img className={classes.poster} src={posterUrl} alt="" />
		</div>
	);
};

const MovieInfo = ({ classes, movie }) => {
	const year = movie.release_date.split("-")[0];
	const genres = movie.genres.map((genre) => genre.name).join(" | ");
	const director = movie.credits.crew.find(
		(person) => person.job === "Director"
	).name;

	return (
		<div>
			<Typography className={classes.title}>
				{movie.title} <span className={classes.date}>({year})</span>
			</Typography>
			<Typography gutterBottom>{genres}</Typography>
			<Typography>
				<span className={classes.director}>Director:</span> {director}
			</Typography>
		</div>
	);
};

const Rating = ({ classes, movie }) => {
	return (
		<div className={classes.ratingContainer}>
			<StarIcon
				style={{
					color: "#FACC15",
					fontSize: "2rem",
					marginRight: "8px",
				}}
			/>
			<Typography className={classes.rating}>
				{movie.vote_average}/10
			</Typography>
		</div>
	);
};

const Stars = ({ classes, movie }) => {
	const stars = movie.credits.cast.filter(
		(person) => person.known_for_department === "Acting"
	);

	const starCards = stars.map((star) => {
		return <StarCard key={star.id} star={star} />;
	});

	return (
		<Box component="section" my={4}>
			<Typography className={classes.stars}>Stars:</Typography>
			<HorizontalScrollContainer>{starCards}</HorizontalScrollContainer>
		</Box>
	);
};

const SingleMoviePage = ({ match }) => {
	const { movie_id } = match.params;

	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);
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
		return <Loading />;
	}

	return (
		<>
			<Banner classes={classes} movie={movie} imageBaseUrl={imageBaseUrl} />

			<section className={classes.main}>
				<Poster classes={classes} movie={movie} imageBaseUrl={imageBaseUrl} />
				<div className={classes.textContainer}>
					<div className={classes.header}>
						<MovieInfo classes={classes} movie={movie} />
						<Rating classes={classes} movie={movie} />
					</div>
					<Typography>{movie.overview}</Typography>
				</div>
			</section>

			<Stars classes={classes} movie={movie} />
		</>
	);
};

export default SingleMoviePage;
