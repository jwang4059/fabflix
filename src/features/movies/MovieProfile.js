import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";

import { selectImageBaseUrl } from "../configuration/configurationSlice";
import StarCard from "./StarCard";

const useStyles = makeStyles((theme) => ({
	backdropContainer: {
		display: "flex",
		justifyContent: "center",
		margin: theme.spacing(2, 0),
	},
	backdrop: {
		height: "16rem",
		width: "100%",
		objectFit: "cover",
	},
	content: {
		display: "flex",
		marginBottom: theme.spacing(2),
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
		color: "rgba(0, 0, 0, 0.54)",
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

const MovieProfile = ({ movie }) => {
	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const year = movie.release_date.split("-")[0];
	const genres = movie.genres.map((genre) => genre.name).join(" | ");
	const director = movie.credits.crew.find(
		(person) => person.job === "Director"
	).name;

	const posterUrl = `${imageBaseUrl}original${movie.poster_path}`;
	const backdropUrl = `${imageBaseUrl}original${movie.backdrop_path}`;

	const stars = movie.credits.cast.filter(
		(person) => person.known_for_department === "Acting"
	);

	const renderedStars = stars.map((star) => {
		return <StarCard key={star.id} star={star} />;
	});

	return (
		<>
			<div className={classes.backdropContainer}>
				<img className={classes.backdrop} src={backdropUrl} alt="" />
			</div>

			<div className={classes.content}>
				<div className={classes.imageContainer}>
					<img className={classes.poster} src={posterUrl} alt="" />
				</div>

				<div className={classes.textContainer}>
					<div className={classes.header}>
						<div>
							<Typography className={classes.title}>
								{movie.title} <span className={classes.date}>({year})</span>
							</Typography>
							<Typography gutterBottom>{genres}</Typography>
							<Typography>
								<span className={classes.director}>Director:</span> {director}
							</Typography>
						</div>
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
					</div>
					<Typography>{movie.overview}</Typography>
				</div>
			</div>
			<Typography className={classes.stars}>Stars:</Typography>
			<div className={classes.starsContainer}>{renderedStars}</div>
		</>
	);
};

export default MovieProfile;
