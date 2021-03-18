import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import TheatersIcon from "@material-ui/icons/Theaters";
import MovieIcon from "@material-ui/icons/Movie";
import StarIcon from "@material-ui/icons/Star";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import FolderIcon from "@material-ui/icons/Folder";
import SubdirectoryArrowRightIcon from "@material-ui/icons/SubdirectoryArrowRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import { selectAllGenres } from "../features/genres/genresSlice";

const useStyles = makeStyles((theme) => ({
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
		paddingLeft: "2rem",
	},
}));

const Drawer = ({ openDrawer, setOpenDrawer }) => {
	const classes = useStyles();
	const history = useHistory();
	const genres = useSelector(selectAllGenres);
	const [openMovies, setOpenMovies] = useState(false);
	const [openBrowse, setOpenBrowse] = useState(false);

	const handleButtonClicked = (url) => {
		history.push(url);
	};

	const MenuList = () => (
		<div className={classes.list} role="presentation">
			<div className={classes.drawerHeader}>
				<IconButton onClick={() => setOpenDrawer(false)}>
					<ChevronLeftIcon />
				</IconButton>
			</div>
			<Divider />
			<List>
				<ListItem button onClick={() => handleButtonClicked("/")}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
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
						<ListItem
							button
							className={classes.nested}
							onClick={() => handleButtonClicked("/movielist/top_rated")}
						>
							<ListItemIcon>
								<StarIcon />
							</ListItemIcon>
							<ListItemText primary="Top Rated" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => handleButtonClicked("/movielist/popular")}
						>
							<ListItemIcon>
								<WhatshotIcon />
							</ListItemIcon>
							<ListItemText primary="Popular" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => handleButtonClicked("/movielist/upcoming")}
						>
							<ListItemIcon>
								<TrendingUpIcon />
							</ListItemIcon>
							<ListItemText primary="Upcoming" />
						</ListItem>
						<ListItem
							button
							className={classes.nested}
							onClick={() => handleButtonClicked("/movielist/now_playing")}
						>
							<ListItemIcon>
								<TheatersIcon />
							</ListItemIcon>
							<ListItemText primary="Now Playing" />
						</ListItem>
					</List>
				</Collapse>
				<ListItem button onClick={() => setOpenBrowse(!openBrowse)}>
					<ListItemIcon>
						<FolderIcon />
					</ListItemIcon>
					<ListItemText primary="Browse" />
					{openBrowse ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={openBrowse} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{genres.map((genre) => (
							<ListItem
								button
								className={classes.nested}
								key={genre.id}
								onClick={() =>
									handleButtonClicked(`/movielist?with_genres=${genre.id}`)
								}
							>
								<ListItemIcon>
									<SubdirectoryArrowRightIcon />
								</ListItemIcon>
								<ListItemText primary={genre.name} />
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>
		</div>
	);

	return (
		<SwipeableDrawer
			anchor="left"
			open={openDrawer}
			onClose={() => setOpenDrawer(false)}
			onOpen={() => setOpenDrawer(true)}
		>
			<MenuList />
		</SwipeableDrawer>
	);
};

export default Drawer;
