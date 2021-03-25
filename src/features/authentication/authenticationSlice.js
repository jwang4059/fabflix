import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isAuthenticated: false,
	status: "idle",
	error: null,
};

export const signin = createAsyncThunk(
	"authentification/signin",
	async (payload) => {
		const response = await fetch("https://fabflix-api.herokuapp.com/signin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		return response.json();
	}
);

const authentificationSlice = createSlice({
	name: "authentification",
	initialState,
	reducers: {
		signout(state) {
			state.user = null;
			state.isAuthenticated = false;
			state.status = "idle";
		},
	},
	extraReducers: {
		[signin.pending]: (state) => {
			state.status = "loading";
		},
		[signin.fulfilled]: (state, action) => {
			//Check the payload
			state.user = action.payload;
			state.isAuthenticated = true;
			state.status = "succeeded";
		},
		[signin.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export const selectUser = (state) => state.authentification.user;

export default authentificationSlice.reducer;
