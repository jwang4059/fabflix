import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SearchBar from "../../components/SearchBar";
import Drawer from "../../components/Drawer";
import { signout } from "../authentication/authenticationSlice";

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
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
}));

const Header = () => {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authentification.isAuthenticated);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileAnchorEl, setMobileAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const mobileOpen = Boolean(mobileAnchorEl);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileAnchorEl(null);
	};

	const handleMenuButton = (path) => {
		handleMenuClose();
		handleMobileMenuClose();
		history.push(path, { from: location });
	};

	const handleSignoutButton = () => {
		dispatch(signout());
		handleMenuClose();
		handleMobileMenuClose();
	};

	const renderMenu = (
		<Menu
			id="menu-desktop"
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={open}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={() => handleMenuButton("/bookmarks")}>
				Bookmarks
			</MenuItem>
			,<MenuItem onClick={handleSignoutButton}>Logout</MenuItem>
		</Menu>
	);

	const renderMobileMenu = (
		<Menu
			id="menu-mobile"
			anchorEl={mobileAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={mobileOpen}
			onClose={handleMobileMenuClose}
		>
			{!auth ? (
				<MenuItem onClick={() => handleMenuButton("/signin")}>Login</MenuItem>
			) : (
				[
					<MenuItem key="profile" onClick={handleMobileMenuClose}>
						Profile
					</MenuItem>,
					<MenuItem
						key="bookmarks"
						onClick={() => handleMenuButton("/bookmarks")}
					>
						Bookmarks
					</MenuItem>,
					<MenuItem key="logout" onClick={handleSignoutButton}>
						Logout
					</MenuItem>,
				]
			)}
		</Menu>
	);

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
					<div className={classes.sectionDesktop}>
						{!auth ? (
							<Button
								color="inherit"
								onClick={() => history.push("/signin", { from: location })}
							>
								Login
							</Button>
						) : (
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-desktop"
								aria-haspopup="true"
								onClick={handleMenuOpen}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						)}
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls="menu-mobile"
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</div>
			</Toolbar>
			<Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
			{renderMenu}
			{renderMobileMenu}
		</AppBar>
	);
};

export default Header;
