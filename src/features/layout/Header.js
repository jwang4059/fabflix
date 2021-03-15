import React, { useState } from "react";
import { useSelector } from "react-redux";
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
import TheatersIcon from "@material-ui/icons/Theaters";
import MovieIcon from "@material-ui/icons/Movie";
import SearchIcon from "@material-ui/icons/Search";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { selectAllGenres } from "../genres/genresSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: "1rem",
	},
	title: {
		flexGrow: 1,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	list: {
		width: 250,
	},
	nested: {
		paddingLeft: "5rem",
	},
}));

const Header = () => {
	const classes = useStyles();
	const genres = useSelector(selectAllGenres);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openMovies, setOpenMovies] = useState(false);
	const [openBrowse, setOpenBrowse] = useState(false);

	const MenuList = () => (
		<div className={classes.list} role="presentation">
			<div className={classes.drawerHeader}>
				<IconButton onClick={() => setOpenDrawer(false)}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				<ListItem button>
					<ListItemIcon>
						<MovieIcon />
					</ListItemIcon>
					<ListItemText primary={"movies"} />
				</ListItem>
				<ListItem button onClick={() => setOpenMovies(!openMovies)}>
					<ListItemIcon>
						<TheatersIcon />
					</ListItemIcon>
					<ListItemText primary="Movies" />
					{openMovies ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openMovies} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						<ListItem button className={classes.nested}>
							<ListItemText primary="Top Rated" />
						</ListItem>
						<ListItem button className={classes.nested}>
							<ListItemText primary="Popular" />
						</ListItem>
						<ListItem button className={classes.nested}>
							<ListItemText primary="Now Playing" />
						</ListItem>
						<ListItem button className={classes.nested}>
							<ListItemText primary="Upcoming" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem button onClick={() => setOpenBrowse(!openBrowse)}>
					<ListItemIcon>
						<SearchIcon />
					</ListItemIcon>
					<ListItemText primary="Browse" />
					{openBrowse ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openBrowse} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{genres.map((genre) => (
							<ListItem button className={classes.nested} key={genre.id}>
								<ListItemText primary={genre.name} />
							</ListItem>
						))}
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
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<SwipeableDrawer
				anchor="left"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
			>
				<MenuList />
			</SwipeableDrawer>
		</div>
	);
};

export default Header;
