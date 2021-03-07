import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		borderBottom: "3px solid black",
	},
}));

const MovieCard = ({ movie }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<p>{movie.original_title}</p>
			<p>{movie.release_date}</p>
			<p>Director</p>
			<p>Genres</p>
			<p>Stars</p>
			<p>Ratings</p>
		</div>
	);
};

export default MovieCard;
