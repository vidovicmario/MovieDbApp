import { createSlice } from "@reduxjs/toolkit";

const PaginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: null,
  },
  reducers: {
    getCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { getCurrentPage } = PaginationSlice.actions;
export default PaginationSlice.reducer;
