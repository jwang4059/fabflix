import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "6rem",
		width: "4rem",
		backgroundColor: "#E5E7EB",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

const NoPerson = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<PersonIcon fontSize="large" />
		</div>
	);
};

export default NoPerson;
