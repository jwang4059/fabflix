import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import SearchBar from "../../components/SearchBar";
import Drawer from "../../components/Drawer";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: "1rem",
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
}));

const Header = () => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpenDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Fabflix
					</Typography>
					<SearchBar />
				</Toolbar>
			</AppBar>
			<Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
		</div>
	);
};

export default Header;
