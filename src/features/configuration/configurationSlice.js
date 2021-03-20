import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	data: [],
	status: "idle",
	error: null,
};

export const fetchConfiguration = createAsyncThunk(
	"configuration/fetchConfiguration",
	async () => {
		const response = await fetch(
			`https://fabflix-api.herokuapp.com/configuration`
		);
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
			console.log(action.error.message);
			state.status = "failed";
		},
	},
});

export const selectConfiguration = (state) => state.configuration.data;
export const selectImageBaseUrl = (state) =>
	state.configuration.data.images.secure_base_url + "original";

export default configurationSlice.reducer;
