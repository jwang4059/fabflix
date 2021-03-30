import React from "react";
import { useDispatch } from "react-redux";
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

export const AddBookmarkButton = ({ userId, movieId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

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
		<div className={classes.root}>
			<Button variant="outlined" color="primary" onClick={handleClick}>
				<BookmarkBorderOutlinedIcon /> Bookmark
			</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				{toast}
			</Snackbar>
		</div>
	);
};

export const DeleteBookmarkButton = ({ userId, bookmarkId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();

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
			<Button variant="outlined" color="secondary" onClick={handleClick}>
				<BookmarkBorderOutlinedIcon /> Delete
			</Button>
			<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
				{toast}
			</Snackbar>
		</div>
	);
};
