import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";

const initialState = {
	data: null,
	status: "idle",
	error: null,
};

export const fetchConfiguration = createAsyncThunk(
	"configuration/fetchConfiguration",
	async () => {
		const response = await fetch("http://localhost:3001/configuration");
		return response.json();
	}
);

const configurationSlice = createSlice({
	name: "configuration",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchConfiguration.pending]: (state) => {
			state.status = "loading";
		},
		[fetchConfiguration.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.status = "succeeded";
		},
		[fetchConfiguration.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export const selectConfiguration = (state) => state.configuration.data;
export const selectImageBaseUrl = (state) =>
	state.configuration.data.images.secure_base_url;

export default configurationSlice.reducer;
