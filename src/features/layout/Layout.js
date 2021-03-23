import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	content: {
		width: "100%",
		flex: "1 0 auto",
	},
}));

const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<Header />
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
