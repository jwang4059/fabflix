import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
		padding: "2rem",
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
			marginBottom: "2rem",
		},
		[theme.breakpoints.up("sm")]: {
			marginRight: "2rem",
		},
	},
	poster: {
		height: "18rem",
		objectFit: "cover",
	},
	title: {
		fontSize: "1.125rem",
		lineHeight: "1.25rem",
		fontWeight: 700,
	},
	date: {
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		fontWeight: 400,
		color: theme.palette.text.secondary,
	},
	rating: {
		display: "flex",
		alignItems: "center",
	},
	semiBold: {
		fontWeight: 600,
	},
	padding: {
		padding: "1rem",
	},
	marginBottom: {
		marginBottom: "1rem",
	},
}));

const MovieListItem = ({ movie }) => {
	const classes = useStyles();
	const genreMap = useSelector(selectGenreMap);
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const imageUrl = imageBaseUrl + movie.poster_path;

	const year = movie.date.split("-")[0];
	const stars = movie.stars
		.slice(0, 3)
		.map((star) => <Link to={`/person/${star.id}`}>{star.name}</Link>)
		.reduce((acc, x) => (acc === null ? [x] : [acc, ", ", x]), null);
	const genres = movie.genre_ids.map((id) => genreMap[id].name).join(" | ");

	return (
		<Card className={classes.card}>
			<div className={classes.content}>
				<div className={classes.imageContainer}>
					<CardMedia>
						<img className={classes.poster} src={imageUrl} alt="" />
					</CardMedia>
				</div>
				<div>
					<CardContent className={classes.padding}>
						<div className={classes.marginBottom}>
							<Typography className={classes.title}>
								{movie.title} <span className={classes.date}>({year})</span>
							</Typography>
							<Typography>{genres}</Typography>
							<div className={classes.rating}>
								<StarIcon style={{ color: "#FACC15", marginRight: "8px" }} />
								<Typography>{movie.rating}/10</Typography>
							</div>
						</div>
						<Typography>
							<span className={classes.semiBold}>Director:</span>{" "}
							{movie.director.name}
						</Typography>
						<Typography>
							<span className={classes.semiBold}>Stars:</span> {stars}
						</Typography>
					</CardContent>
					<CardActions className={classes.padding}>
						<Link to={`/movie/${movie.id}`}>View More</Link>
					</CardActions>
				</div>
			</div>
		</Card>
	);
};

export default MovieListItem;
