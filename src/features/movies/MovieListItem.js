import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import StarIcon from "@material-ui/icons/Star";
import Typography from "@material-ui/core/Typography";

import { selectImageBaseUrl } from "../configuration/configurationSlice";
import { selectGenreMap } from "../genres/genresSlice";
import { NoMovie } from "../../components/Placeholder";
import { AddBookmarkButton } from "../bookmarks/BookmarkButton";

const useStyles = makeStyles((theme) => ({
	card: {
		margin: "1rem 0",
	},
	content: {
		display: "flex",
		padding: "2rem",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	imageContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			marginBottom: "2rem",
		},
		[theme.breakpoints.up("sm")]: {
			marginRight: "2rem",
		},
	},
	textContainer: {
		flexGrow: 1,
	},
	poster: {
		height: "18rem",
		width: "12rem",
		objectFit: "cover",
	},
	title: {
		fontSize: "1.125rem",
		lineHeight: "1.25rem",
		fontWeight: 700,
	},
	date: {
		fontSize: "0.875rem",
		lineHeight: "1.25rem",
		fontWeight: 400,
		color: theme.palette.text.secondary,
	},
	rating: {
		display: "flex",
		alignItems: "center",
	},
	semiBold: {
		fontWeight: 600,
	},
	padding: {
		padding: "1rem",
	},
	marginBottom: {
		marginBottom: "1rem",
	},
	marginLeft: {
		marginLeft: "1rem",
	},
	link: {
		color: "inherit",
		textDecoration: "none",
	},
	contentHeader: {
		display: "flex",
		marginBottom: "1rem",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
		},
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	contentHeaderMain: {
		flexGrow: 1,
	},
}));

const MovieListItem = ({ movie, show }) => {
	const classes = useStyles();
	const genreMap = useSelector(selectGenreMap);
	const imageBaseUrl = useSelector(selectImageBaseUrl);
	const auth = useSelector((state) => state.authentification.isAuthenticated);
	const userId = useSelector((state) => state.authentification.user?.id);

	let poster = null;
	if (!movie.poster_path) {
		poster = <NoMovie height={"18rem"} width={"12rem"} />;
	} else {
		const posterUrl = imageBaseUrl + movie.poster_path;
		poster = <img className={classes.poster} src={posterUrl} alt="" />;
	}

	const year = movie.release_date ? movie.release_date.split("-")[0] : "";

	let stars, director;

	if (!movie.credits) {
		stars = "N/A";
		director = "N/A";
	} else {
		stars = movie.credits.cast
			.filter((person) => person.known_for_department === "Acting")
			.sort((a, b) => b.popularity - a.popularity)
			.slice(0, 3)
			.map((star) => (
				<Link to={`/person/${star.id}`} key={star.id}>
					{star.name}
				</Link>
			))
			.reduce((acc, x) => (acc === null ? [x] : [acc, ", ", x]), null);

		director = movie.credits.crew.find((person) => person.job === "Director");
	}

	let genreIds;

	if (movie.genres) {
		genreIds = movie.genres.map((genre) => genre.id);
	} else if (movie.genre_ids) {
		genreIds = movie.genre_ids;
	} else {
		genreIds = [];
	}

	const genres = genreIds
		.map((id) => {
			return (
				<Link to={`/movielist?with_genres=${id}`} key={id}>
					{genreMap[id].name}
				</Link>
			);
		})
		.reduce((acc, x) => (acc === null ? [x] : [acc, " | ", x]), null);

	return (
		<Card className={classes.card}>
			<div className={classes.content}>
				<div className={classes.imageContainer}>
					<CardMedia>
						<Link to={`/movie/${movie.id}`}>{poster}</Link>
					</CardMedia>
				</div>
				<div className={classes.textContainer}>
					<CardContent className={classes.padding}>
						<div className={classes.contentHeader}>
							<div className={classes.contentHeaderMain}>
								<Typography className={classes.title} component="h2">
									<Link to={`/movie/${movie.id}`} className={classes.link}>
										{movie.title}
									</Link>{" "}
									{Boolean(year) && (
										<span className={classes.date}>({year})</span>
									)}
								</Typography>
								{Boolean(genres) && <Typography>{genres}</Typography>}
								<div className={classes.rating}>
									<StarIcon style={{ color: "#FACC15", marginRight: "8px" }} />
									<Typography>
										{movie.vote_average ? movie.vote_average : 0}/10
									</Typography>
								</div>
							</div>
							{auth && show && (
								<div className={classes.marginLeft}>
									<AddBookmarkButton userId={userId} movieId={movie.id} />
								</div>
							)}
						</div>
						<Typography>
							<span className={classes.semiBold}>Director:</span>{" "}
							{director ? director.name : "N/A"}
						</Typography>
						<Typography>
							<span className={classes.semiBold}>Stars:</span>{" "}
							{stars ? stars : "N/A"}
						</Typography>
					</CardContent>
					<CardActions className={classes.padding}>
						<Link to={`/movie/${movie.id}`}>View More</Link>
					</CardActions>
				</div>
			</div>
		</Card>
	);
};

MovieListItem.defaultProps = {
	show: true,
};

export default MovieListItem;
