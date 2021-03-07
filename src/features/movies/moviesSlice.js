import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";

const initialState = {
	data: [],
	status: "idle",
	error: null,
};

export const fetchMovieTopRated = createAsyncThunk(
	"movies/fetchMovieTopRated",
	async () => {
		const response = await fetch("http://localhost:3001/movie/top_rated");
		return response.json();
	}
);

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchMovieTopRated.pending]: (state) => {
			state.status = "loading";
		},
		[fetchMovieTopRated.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "succeeded";
		},
		[fetchMovieTopRated.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export const selectAllMovies = (state) => state.movies.data;

export default moviesSlice.reducer;
