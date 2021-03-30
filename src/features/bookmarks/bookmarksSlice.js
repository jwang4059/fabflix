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

export const fetchBookmarks = createAsyncThunk(
	"bookmarks/fetchBookmarks",
	async (payload) => {
		const response = await fetch(
			"https://fabflix-api.herokuapp.com/bookmarks/fetch",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			}
		);

		const data = await response.json();
		return data;
	}
);

export const addBookmark = createAsyncThunk(
	"bookmarks/addBookmark",
	async (payload) => {
		const response = await fetch(
			"https://fabflix-api.herokuapp.com/bookmarks/add",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			}
		);

		const data = await response.json();
		return data;
	}
);

export const deleteBookmark = createAsyncThunk(
	"bookmarks/deleteBookmark",
	async (payload) => {
		const response = await fetch(
			"https://fabflix-api.herokuapp.com/bookmarks/delete",
			{
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			}
		);

		const data = await response.json();
		return data;
	}
);

const bookmarksSlice = createSlice({
	name: "bookmarks",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchBookmarks.pending]: (state) => {
			state.status = "loading";
		},
		[fetchBookmarks.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.error = null;
			state.status = "succeeded";
		},
		[fetchBookmarks.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
		[addBookmark.pending]: (state) => {
			state.status = "loading";
		},
		[addBookmark.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.error = null;
			state.status = "succeeded";
		},
		[addBookmark.rejected]: (state, action) => {
			state.error = action.error.message;
			state.status = "failed";
		},
	},
});

export const selectAllBookmarks = (state) => state.bookmarks.data;

export const selectAllBookmarkIds = createSelector(
	[selectAllBookmarks],
	(bookmarks) => bookmarks.map((bookmark) => bookmark.movieid)
);

export default bookmarksSlice.reducer;
