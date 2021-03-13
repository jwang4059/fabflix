import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MovieIcon from "@material-ui/icons/Movie";

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

const NoPerson = (props) => {
	const classes = useStyles(props);

	return (
		<div className={classes.root}>
			<MovieIcon fontSize="large" />
		</div>
	);
};

export default NoPerson;
