import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from "../features/configuration/configurationSlice";
import moviesReducer from "../features/movies/moviesSlice";
import genresReducer from "../features/genres/genresSlice";

export default configureStore({
	reducer: {
		configuration: configurationReducer,
		movies: moviesReducer,
		genres: genresReducer,
	},
});
