import { configureStore } from "@reduxjs/toolkit";
import authentificationReducer from "../features/authentication/authenticationSlice";
import configurationReducer from "../features/configuration/configurationSlice";
import moviesReducer from "../features/movies/moviesSlice";
import genresReducer from "../features/genres/genresSlice";
import bookmarksReducer from "../features/bookmarks/bookmarksSlice";

export default configureStore({
	reducer: {
		authentification: authentificationReducer,
		configuration: configurationReducer,
		movies: moviesReducer,
		genres: genresReducer,
		bookmarks: bookmarksReducer,
	},
});
