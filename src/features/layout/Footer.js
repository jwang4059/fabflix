import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	footer: {
		flexShrink: 0,
		padding: theme.spacing(4, 0),
	},
}));

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footer}>
			<Typography variant="body2" color="textSecondary" align="center">
				© {new Date().getFullYear()}, Built with
				{` `}
				<a href="https://github.com/facebook/create-react-app">
					Create React App
				</a>
				<br />
				Created by John Wang 2021
			</Typography>
		</footer>
	);
};

export default Footer;
