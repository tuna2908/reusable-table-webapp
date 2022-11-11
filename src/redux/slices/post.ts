import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  currentPost: {},
  total: 0,
  currentPage: 0,
};

export const postsSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    onGetPosts: (state, action) => {
      const { payload } = action;
      state.posts = payload;
    },

    onSetTotalPosts: (state, action) => {
      const { payload } = action;
      state.total = payload;
    },

    onChangeCurrentPage: (state, action) => {
      const { payload } = action;
      state.currentPage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onGetPosts, onSetTotalPosts, onChangeCurrentPage } =
  postsSlice.actions;

export default postsSlice.reducer;
