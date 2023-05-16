import { createSlice } from "@reduxjs/toolkit";
//pagination slice, za nasu aplikaciju u kojoj smo izdvojili inicijalni stejt u kojem cuvamo neke vrijednosti
const PaginationSlice = createSlice({
  name: "pagination",
  initialState: {
    currentPage: null,
  },
  //reducer koji sadrzi funkcije koje hendluju nase podatke
  reducers: {
    getCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { getCurrentPage } = PaginationSlice.actions;
export default PaginationSlice.reducer;
