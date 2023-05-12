import alovaInstance from "./index";

const filterMovieGetter = (genre: string) =>
  alovaInstance.Get(`/discover/movie?api_key=c9b1e7036fc2d196fc392fadac54777d&with_genres=${genre}`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    // params: {
    //  _genre: genre
    // },
  });

export default filterMovieGetter;
