import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { NoMovie } from "../../components/Placeholder";
import { selectImageBaseUrl } from "../configuration/configurationSlice";

const useStyles = makeStyles((theme) => ({
	contentContainer: {
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
		height: "18rem",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
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
	link: {
		color: "inherit",
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

const Description = ({ classes, movie }) => {
	let overview = movie.overview
		? movie.overview.substring(0, 250)
		: "No summary available";

	if (overview.length >= 250) overview = overview + "...";

	return (
		<div className={classes.textContainer}>
			<Typography className={classes.title} component="h2">
				{movie.title}
			</Typography>
			<Typography>
				{overview}{" "}
				<Link to={`movie/${movie.id}`} className={classes.link}>
					View More
				</Link>
			</Typography>
		</div>
	);
};

const MovieBanner = ({ movie }) => {
	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);

	let backdropStyles = {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end",
		minHeight: "60vh",
		padding: "1rem",
		margin: "2rem 0",
		color: "white",
		backgroundColor: "black",
		backgroundPosition: "center center",
		backgroundAttachment: "fixed",
		backgroundSize: "cover",
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
		<div style={backdropStyles}>
			<div className={classes.contentContainer}>
				<Poster classes={classes} movie={movie} imageBaseUrl={imageBaseUrl} />
				<Description classes={classes} movie={movie} />
			</div>
		</div>
	);
};

export default MovieBanner;
