import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { selectImageBaseUrl } from "../configuration/configurationSlice";
import { NoMovie } from "../../components/Placeholder";

const useStyles = makeStyles((theme) => ({
	card: {
		height: "auto",
		width: "10rem",
		marginRight: theme.spacing(1),
		flex: "0 0 auto",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	poster: {
		height: "12rem",
		width: "80%",
		objectFit: "cover",
		borderRadius: "0.5rem",
	},
	link: {
		height: "100%",
		width: "100%",
	},
	title: {
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		margin: theme.spacing(2, 0),
	},
}));

const StarCard = ({ movie }) => {
	const classes = useStyles();
	const imageBaseUrl = useSelector(selectImageBaseUrl);

	let poster = null;
	if (!movie.poster_path) {
		poster = <NoMovie height={"12rem"} width={"80%"} />;
	} else {
		const posterUrl = imageBaseUrl + movie.poster_path;
		poster = <img className={classes.poster} src={posterUrl} alt="" />;
	}

	return (
		<Link className={classes.link} to={`/movie/${movie.id}`}>
			<div className={classes.card}>
				<div className={classes.content}>
					{poster}
					<Typography className={classes.title}>{movie.title}</Typography>
				</div>
			</div>
		</Link>
	);
};

export default StarCard;
