import {
	createSlice,
	createAsyncThunk,
	createEntityAdapter,
} from "@reduxjs/toolkit";

const genresAdapter = createEntityAdapter();

const initialState = genresAdapter.getInitialState({
	status: "idle",
	error: null,
});

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
	const response = await fetch(`https://fabflix-api.herokuapp.com/genrelist`);
	return response.json();
});

const genresSlice = createSlice({
	name: "genres",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchGenres.pending]: (state) => {
			state.status = "loading";
		},
		[fetchGenres.fulfilled]: (state, action) => {
			genresAdapter.setAll(state, action.payload.genres);
			state.status = "succeeded";
		},
		[fetchGenres.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export default genresSlice.reducer;

export const {
	selectAll: selectAllGenres,
	selectEntities: selectGenreMap,
} = genresAdapter.getSelectors((state) => state.genres);
