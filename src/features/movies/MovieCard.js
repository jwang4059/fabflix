import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { selectEntities } from "../genres/genresSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		borderBottom: "3px solid black",
	},
}));

const MovieCard = ({ movie }) => {
	const classes = useStyles();
	const genreMap = useSelector(selectEntities);

	const genres = movie.genre_ids.map((id) => {
		const name = genreMap[id].name;

		return <p key={id}>- {name}</p>;
	});

	return (
		<div className={classes.root}>
			<p>Title: {movie.title}</p>
			<p>Date: {movie.date}</p>
			<p>Director: {movie.director.name}</p>
			<p>Genres: </p>
			{genres}
			<p>Stars</p>
			<p>Ratings: {movie.rating}</p>
		</div>
	);
};

export default MovieCard;
