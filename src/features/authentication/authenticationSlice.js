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

		const data = await response.json();
		return data;
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
			if (action.payload.status === "succeeded") {
				state.user = action.payload.user;
				state.isAuthenticated = true;
				state.error = null;
				state.status = "succeeded";
			} else {
				state.error = action.payload.message;
				state.status = "failed";
			}
		},
		[signin.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export const selectUser = (state) => state.authentification.user;

export default authentificationSlice.reducer;

export const { signout } = authentificationSlice.actions;
