import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";

const moviesAdapter = createEntityAdapter();

const initialState = moviesAdapter.getInitialState({
	status: "idle",
	error: null,
});

export const fetchMovieList = createAsyncThunk(
	"movies/fetchMovieList",
	async (payload) => {
		const { param, query } = payload;
		const response = await fetch(
			`http://localhost:3001/movielist${param}${query}`
		);
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
			moviesAdapter.setAll(state, action.payload);
			state.status = "succeeded";
		},
		[fetchMovieList.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export default moviesSlice.reducer;

export const { selectAll: selectAllMovies } = moviesAdapter.getSelectors(
	(state) => state.movies
);
