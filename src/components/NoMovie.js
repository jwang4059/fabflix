import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieIcon from "@material-ui/icons/Movie";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "12rem",
		width: "80%",
		backgroundColor: "#E5E7EB",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "0.5rem",
	},
}));

const NoPerson = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<MovieIcon fontSize="large" />
		</div>
	);
};

export default NoPerson;
