import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import Loading from "../components/Loading";
import { NoMovie, NoPersons } from "../components/Placeholder";
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
	semiBold: {
		fontWeight: 600,
	},
}));

const Backdrop = ({ classes, movie, imageBaseUrl }) => {
	if (!movie.backdrop_path) {
		return null;
	}

	const backdropUrl = imageBaseUrl + movie.backdrop_path;

	return (
		<Box component="section" display="flex" justifyContent="center" my={4}>
			<img className={classes.backdrop} src={backdropUrl} alt="" />
		</Box>
	);
};

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

const MovieInfo = ({ classes, movie }) => {
	const year = movie.release_date.split("-")[0];

	const genres = movie.genres
		.map((genre) => {
			return (
				<Link to={`/movielist?with_genres=${genre.id}`} key={genre.id}>
					{genre.name}
				</Link>
			);
		})
		.reduce((acc, x) => (acc === null ? [x] : [acc, " | ", x]), null);

	const director = movie.credits.crew.find(
		(person) => person.job === "Director"
	);

	return (
		<div>
			<Typography className={classes.title}>
				{movie.title}{" "}
				<span className={classes.date}>{year ? `(${year})` : ""}</span>
			</Typography>
			<Typography gutterBottom>{genres ? genres : "N/A"}</Typography>
			<Typography>
				<span className={classes.semiBold}>Director:</span>{" "}
				{director ? director.name : "N/A"}
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
				{movie.vote_average ? movie.vote_average : 0}/10
			</Typography>
		</div>
	);
};

const Stars = ({ classes, movie }) => {
	const starCards = movie.credits.cast
		.filter((person) => person.known_for_department === "Acting")
		.map((star) => {
			return <StarCard key={star.id} star={star} />;
		});

	return (
		<Box component="section" my={4}>
			<Typography className={classes.semiBold}>Stars:</Typography>
			{starCards && starCards.length > 0 ? (
				<HorizontalScrollContainer>{starCards}</HorizontalScrollContainer>
			) : (
				<NoPersons width="100%" height="16rem" />
			)}
		</Box>
	);
};

const MoviePage = ({ match }) => {
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
			<Backdrop classes={classes} movie={movie} imageBaseUrl={imageBaseUrl} />

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

			<Box display="flex" justifyContent="center" alignItems="center">
				<Link to="/movielist">
					<Button variant="contained" color="primary" size="large">
						Back to movie list
					</Button>
				</Link>
			</Box>
		</>
	);
};

export default MoviePage;
