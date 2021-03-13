import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import MovieIcon from "@material-ui/icons/Movie";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: "1rem",
	},
	title: {
		flexGrow: 1,
	},
	list: {
		width: 250,
	},
	nested: {
		paddingLeft: "2rem",
	},
}));

export default function ButtonAppBar() {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openMovies, setOpenMovies] = useState(false);

	const toggleDrawer = (open) => () => {
		setOpenDrawer(open);
	};

	const MenuList = () => (
		<div className={classes.list} role="presentation">
			<List>
				<ListItem button>
					<ListItemIcon>
						<MovieIcon />
					</ListItemIcon>
					<ListItemText primary={"movies"} />
				</ListItem>
				<ListItem button onClick={() => setOpenMovies(!openMovies)}>
					<ListItemIcon>
						<MovieIcon />
					</ListItemIcon>
					<ListItemText primary="Movies" />
					{openMovies ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openMovies} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemIcon>
								<MovieIcon />
							</ListItemIcon>
							<ListItemText primary="Top Rated" />
						</ListItem>
					</List>
				</Collapse>
			</List>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon>
						<MovieIcon />
					</ListItemIcon>
					<ListItemText primary={"logout"} />
				</ListItem>
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<AppBar className={classes.appBar} position="fixed">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Fabflix
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				anchor="left"
				open={openDrawer}
				onClose={toggleDrawer(false)}
				onOpen={toggleDrawer(true)}
			>
				<Toolbar />
				<MenuList />
			</SwipeableDrawer>
		</div>
	);
}
