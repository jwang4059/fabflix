import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";

import { selectImageBaseUrl } from "../configuration/configurationSlice";
import { selectGenreMap } from "../genres/genresSlice";

const useStyles = makeStyles((theme) => ({
	card: {
		margin: theme.spacing(2, 0),
	},
	content: {
		display: "flex",
		padding: theme.spacing(1),
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
			marginTop: "2rem",
		},
	},
	textContainer: {
		padding: "2rem",
	},
	cardHeader: {
		marginBottom: theme.spacing(2),
	},
	title: {
		fontSize: "1.125rem",
		lineHeight: 1.25,
		fontWeight: 700,
	},
	date: {
		fontSize: "0.875rem",
		lineHeight: 1.25,
		fontWeight: 400,
		color: "rgba(0, 0, 0, 0.54)",
	},
	rating: {
		display: "flex",
		alignItems: "center",
	},
}));

const MovieCard = ({ movie }) => {
	const classes = useStyles();
	const genreMap = useSelector(selectGenreMap);
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const imageUrl = `${imageBaseUrl}w185${movie.images.poster_path}`;

	const year = movie.date.split("-")[0];
	const stars = movie.stars
		.slice(0, 3)
		.map((star) => star.name)
		.join(", ");
	const genres = movie.genre_ids.map((id) => genreMap[id].name).join(" | ");

	return (
		// <div className={classes.root}>
		//
		// 	<p>Title: {movie.title}</p>
		// 	<p>Date: {movie.date}</p>
		// 	<p>Director: {movie.director.name}</p>
		// 	<p>Genres: </p>
		// 	{genres}
		// 	<p>Stars</p>
		// 	<p>Ratings: {movie.rating}</p>
		// </div>
		<Card className={classes.card}>
			<div className={classes.content}>
				<div className={classes.imageContainer}>
					<CardMedia>
						<img src={imageUrl} alt="" />
					</CardMedia>
				</div>
				<div className={classes.textContainer}>
					<CardContent>
						<div className={classes.cardHeader}>
							<Typography className={classes.title}>
								{movie.title} <span className={classes.date}>({year})</span>
							</Typography>
							<Typography>{genres}</Typography>
							<div className={classes.rating}>
								<StarIcon style={{ color: "#FACC15", marginRight: "8px" }} />
								<Typography>{movie.rating}/10</Typography>
							</div>
						</div>
						<Typography>Director: {movie.director.name}</Typography>
						<Typography>Stars: {stars}</Typography>
					</CardContent>
					<CardActions>
						<Button>View More</Button>
					</CardActions>
				</div>
			</div>
		</Card>
	);
};

export default MovieCard;
