import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import RootState from "./store"; // import the RootState type from the store
import { Movie } from "../components/Interfaces";

export interface FavoriteState {
  favorite: Array<Movie>;
}

const initialState: FavoriteState = {
  favorite: [],
};

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState,
  //get favoriteMovie, uzima jedan film i setuje u state,
  reducers: {
    getFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      console.log(action.payload);

      let favoriteItem = action.payload;
      let favoriteArray: Movie[] = [...state.favorite];

      let found = null;
      //ako postoji film u favorite, onda brise taj isti film u suprotnom ga setuje
      favoriteArray.find((el, index) => {
        if (el.id === favoriteItem.id) found = index;
      });

      if (found !== null) {
        favoriteArray.splice(found, 1);
      } else {
        favoriteArray.push(favoriteItem);
      }
      //setujemo rezultat u state i spremamo u local storage
      state.favorite = favoriteArray;
      localStorage.setItem("favorite", JSON.stringify(state.favorite));
      console.log(state.favorite, found);
    },
    //sve so imam u local storage setujem u state
    restoreFavorite: (state) => {
      const favoriteFromLocalStorage = localStorage.getItem("favorite");
      if (favoriteFromLocalStorage !== null) {
        const parsedFavorite = JSON.parse(favoriteFromLocalStorage);
        state.favorite = parsedFavorite;
      }
    },
  },
});

export const { getFavoriteMovie, restoreFavorite } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;

// Define a type for the RootState
export type RootState = ReturnType<typeof FavoriteSlice.reducer>;

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface Movie {
//   id: number;
//   title: string;
// }

// interface FavoriteState {
//   favorite: Movie[];
// }

// const initialState: FavoriteState = {
//   favorite: [],
// };

// const FavoriteSlice = createSlice({
//   name: "favorite",
//   initialState,
//   reducers: {
//     getFavoriteMovie: (state, action: PayloadAction<Movie>) => {
//       const favoriteItem = action.payload;
//       const favoriteArray = [...state.favorite];

//       const found = favoriteArray.findIndex((el) => el.id === favoriteItem.id);

//       if (found !== -1) {
//         favoriteArray.splice(found, 1);
//       } else {
//         favoriteArray.push(favoriteItem);
//       }

//       state.favorite = favoriteArray;
//       localStorage.setItem("favorite", JSON.stringify(state.favorite));
//       console.log(state.favorite, found);
//     },
//   },
// });

// export const { getFavoriteMovie } = FavoriteSlice.actions;
// export default FavoriteSlice.reducer;
