import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SearchBar from "../../components/SearchBar";
import Drawer from "../../components/Drawer";

const useStyles = makeStyles((theme) => ({
	navigation: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		minWidth: "16%",
	},
	title: {
		color: "inherit",
		textDecoration: "none",
		fontSize: "1.25rem",
		lineHeight: "1.75rem",
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	profile: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		minWidth: "16%",
	},
	login: {
		color: "inherit",
		textDecoration: "none",
		fontSize: "1rem",
		lineHeight: "1.5rem",
		textTransform: "uppercase",
	},
}));

const Header = () => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<AppBar id="header" position="sticky">
			<Toolbar>
				<div className={classes.navigation}>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="menu"
						onClick={() => setOpenDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Link to="/" className={classes.title}>
						Fabflix
					</Link>
				</div>
				<SearchBar />
				<div className={classes.profile}>
					<Link to="/signin" className={classes.login}>
						Login
					</Link>
				</div>
			</Toolbar>
			<Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
		</AppBar>
	);
};

export default Header;
