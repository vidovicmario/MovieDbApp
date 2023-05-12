import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import BookmarkAndFavoriteMovies from "./pages/BookmarkAndFavoriteMovies";
import "./App.css";
import Favorite from "./pages/Favorite";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreFavorite } from "./store/favoriteSlice";
import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const favorite = localStorage.getItem("favorite") ?? "";
    dispatch(restoreFavorite(JSON.parse(favorite)));
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route index path="/movie-details/:id" element={<MovieDetails />} />
        <Route index path="/bookmark-favorites-movies" element={<BookmarkAndFavoriteMovies />} />
        <Route index path="/favorite" element={<Favorite />} />
      </Routes>
    </div>
  );
}

export default App;
