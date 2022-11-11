import { configureStore } from "@reduxjs/toolkit";
import postState from "./slices/post";

const store = configureStore({
  reducer: {
    postState,
  },
});

export default store;
