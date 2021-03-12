import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

import Layout from "./features/layout/Layout";
import Loading from "./components/Loading";
import MoviesListPage from "./pages/MovieListPage";
import SingleMoviePage from "./pages/SingleMoviePage";
import { fetchConfiguration } from "./features/configuration/configurationSlice";
import { fetchGenres } from "./features/genres/genresSlice";

const App = () => {
	const dispatch = useDispatch();
	const configurationStatus = useSelector(
		(state) => state.configuration.status
	);
	const genresStatus = useSelector((state) => state.genres.status);

	useEffect(() => {
		if (configurationStatus === "idle") {
			dispatch(fetchConfiguration());
		}
		if (genresStatus === "idle") {
			dispatch(fetchGenres());
		}
	}, [configurationStatus, genresStatus, dispatch]);

	let content = null;

	if (configurationStatus === "failed" || genresStatus === "failed") {
		content = <div>ERROR</div>;
	} else if (configurationStatus === "loading" || genresStatus === "loading") {
		content = <Loading />;
	} else if (
		configurationStatus === "succeeded" &&
		genresStatus === "succeeded"
	) {
		content = (
			<Router>
				<Switch>
					<Route exact path="/" component={MoviesListPage} />
					<Route exact path="/movie/:movie_id" component={SingleMoviePage} />
					<Redirect to="/" />
				</Switch>
			</Router>
		);
	}

	return <Layout>{content}</Layout>;
};

export default App;
