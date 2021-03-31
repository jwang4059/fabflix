import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";

import { addBookmark, deleteBookmark } from "./bookmarksSlice";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

const Alert = (props) => {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const AddBookmarkButton = ({ movieId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authentification.isAuthenticated);
	const userId = useSelector((state) => state.authentification.user?.id);

	const [open, setOpen] = React.useState(false);
	const [toast, setToast] = React.useState(null);

	const handleClick = async () => {
		const response = await dispatch(addBookmark({ userId, movieId }));
		if (response.meta.requestStatus === "fulfilled") {
			setToast(
				<Alert onClose={handleClose} severity="success">
					Bookmark added!
				</Alert>
			);
		} else if (response.meta.requestStatus === "rejected") {
			setToast(
				<Alert onClose={handleClose} severity="error">
					Failed to add bookmark!
				</Alert>
			);
		}
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div
			className={classes.root}
			title={!auth ? "Must be signed in to bookmark" : null}
		>
			<Button
				variant="outlined"
				color="primary"
				disabled={!auth}
				onClick={handleClick}
			>
				<BookmarkBorderOutlinedIcon /> Bookmark
			</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				{toast}
			</Snackbar>
		</div>
	);
};

export const DeleteBookmarkButton = ({ bookmarkId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.authentification.isAuthenticated);
	const userId = useSelector((state) => state.authentification.user?.id);

	const [open, setOpen] = React.useState(false);
	const [toast, setToast] = React.useState(null);

	const handleClick = async () => {
		const response = await dispatch(deleteBookmark({ userId, bookmarkId }));
		if (response.meta.requestStatus === "fulfilled") {
			setToast(
				<Alert onClose={handleClose} severity="success">
					Bookmark deleted!
				</Alert>
			);
		} else if (response.meta.requestStatus === "rejected") {
			setToast(
				<Alert onClose={handleClose} severity="error">
					Failed to delete bookmark!
				</Alert>
			);
		}
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Button
				variant="outlined"
				color="secondary"
				disabled={!auth}
				onClick={handleClick}
			>
				<BookmarkBorderOutlinedIcon /> Delete
			</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				{toast}
			</Snackbar>
		</div>
	);
};
