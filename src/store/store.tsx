import { configureStore } from "@reduxjs/toolkit";
import genreFilter from "./genreFilter";
import paginationSlice from "./paginationSlice";
import favoriteSlice from "./favoriteSlice";

const store = configureStore({
  reducer: {
    genreStore: genreFilter,
    paginationStore: paginationSlice,
    favoriteStore: favoriteSlice,
  },
});

export default store;
