import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import MoviesList from "../features/movies/MoviesList";
import Pagination from "../components/Pagination";
import SortMenu from "../components/SortMenu";
import {
	selectAllMovies,
	fetchMovieList,
	updateUrl,
} from "../features/movies/moviesSlice";
import { selectGenreMap } from "../features/genres/genresSlice";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 0,
		margin: "1rem 0",
		[theme.breakpoints.up("sm")]: {
			flexDirection: "row",
		},
	},
	title: {
		flexGrow: 1,
		fontSize: "2.25rem",
		lineHeight: "2.5rem",
		fontWeight: "700",
	},
}));

const ids = {
	top_rated: "Top Rated",
	popular: "Popular",
	upcoming: "Upcoming",
	now_playing: "Now Playing",
};

const MovieListPage = () => {
	const classes = useStyles();
	const { id } = useParams();
	const location = useLocation();
	const query = new URLSearchParams(location.search);

	const dispatch = useDispatch();
	const genreMap = useSelector(selectGenreMap);
	const movies = useSelector(selectAllMovies);
	const movielistUrl = useSelector((state) => state.movies.url);

	const moviesStatus = useSelector((state) => state.movies.status);
	const error = useSelector((state) => state.movies.error);

	useEffect(() => {
		const search = location.search ? location.search : "";
		const url = `${location.pathname}${search}`;

		if (url !== movielistUrl) {
			const payload = {
				param: id ? `/${id}` : "",
				search: search,
			};

			dispatch(fetchMovieList(payload));
			dispatch(updateUrl(url));
		}
	}, [movielistUrl, id, location, dispatch]);

	let title = null;

	if (id) {
		title = `${ids[id]} Movies`;
	} else if (query.has("query")) {
		title = `Search: ${query.get("query")}`;
	} else if (query.has("with_genres")) {
		title = `Genre: ${genreMap[query.get("with_genres")].name}`;
	} else {
		title = "Movie List";
	}

	let content = null;

	if (moviesStatus === "loading") {
		content = <Loading />;
	} else if (moviesStatus === "succeeded") {
		content = (
			<>
				<div className={classes.container}>
					<Typography className={classes.title} component="h1">
						{title}
					</Typography>
					<SortMenu />
				</div>
				<MoviesList movies={movies} />
				<Pagination />
			</>
		);
	} else if (moviesStatus === "failed") {
		content = <div>{error}</div>;
	}

	return content;
};

export default MovieListPage;
