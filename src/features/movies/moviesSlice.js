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

export const fetchMovieList = createAsyncThunk(
	"movies/fetchMovieList",
	async (sorted) => {
		const response = await fetch(`http://localhost:3001/movielist/${sorted}`);
		return response.json();
	}
);

const moviesSlice = createSlice({
	name: "movies",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchMovieList.pending]: (state) => {
			state.status = "loading";
		},
		[fetchMovieList.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "succeeded";
		},
		[fetchMovieList.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export const selectAllMovies = (state) => state.movies.data;

export default moviesSlice.reducer;
