import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import genresReducer from "../features/genres/genresSlice";

export default configureStore({
	reducer: {
		movies: moviesReducer,
		genres: genresReducer,
	},
});
