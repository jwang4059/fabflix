import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";

const moviesAdapter = createEntityAdapter();

const initialState = moviesAdapter.getInitialState({
	status: "idle",
	error: null,
	page: 1,
	total_pages: 1,
	total_results: 0,
});

export const fetchMovieList = createAsyncThunk(
	"movies/fetchMovieList",
	async (payload) => {
		const { param, search } = payload;
		const response = await fetch(
			`http://localhost:3001/movielist${param}${search}`
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
			moviesAdapter.setAll(state, action.payload.results);
			state.status = "succeeded";
			state.page = action.payload.page;
			state.total_pages = action.payload.total_pages;
			state.total_results = action.payload.total_results;
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
