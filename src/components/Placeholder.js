import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: (props) => ({
		height: props.height,
		width: props.width,
		backgroundColor: "#E5E7EB",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "0.5rem",
	}),
}));

export const NoPerson = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<PersonIcon fontSize="large" />
		</div>
	);
};

export const NoPersons = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<Typography align="center">No Stars Available</Typography>
		</div>
	);
};

export const NoMovie = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<MovieIcon fontSize="large" />
		</div>
	);
};

export const NoMovies = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<Typography align="center">No Movies Available</Typography>
		</div>
	);
};
