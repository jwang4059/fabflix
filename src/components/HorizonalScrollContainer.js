import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexWrap: "nowrap",
		overflowX: "auto",
		overflowY: "hidden",
		padding: theme.spacing(1, 0),
	},
}));

const HorizontalScrollContainer = ({ children }) => {
	const classes = useStyles();

	return <div className={classes.container}>{children}</div>;
};

export default HorizontalScrollContainer;
