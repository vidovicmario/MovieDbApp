import { createSlice } from "@reduxjs/toolkit";

const GenreFilter = createSlice({
    name: 'Genre',
    initialState: {
        withGenre:''
    },
    reducers: {
        getGenres: (state, action) => {
            state.withGenre = action.payload
        }
    }
})

export const {getGenres} = GenreFilter.actions;
export default GenreFilter.reducer;