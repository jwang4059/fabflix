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
import LandingPage from "./pages/LandingPage";
import MoviesListPage from "./pages/MovieListPage";
import MoviePage from "./pages/MoviePage";
import PersonPage from "./pages/PersonPage";
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
			<Switch>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/movie/:movie_id" component={MoviePage} />
				<Route exact path="/person/:person_id" component={PersonPage} />
				<Route exact path="/movielist" component={MoviesListPage} />
				<Route exact path="/movielist/:id" component={MoviesListPage} />
				<Redirect to="/" />
			</Switch>
		);
	}

	return (
		<Router>
			<Layout>{content}</Layout>
		</Router>
	);
};

export default App;
