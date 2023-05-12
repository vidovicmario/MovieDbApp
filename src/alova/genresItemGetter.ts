import alovaInstance from "./index";

const genresItemGetter = () =>
  alovaInstance.Get(`/genre/movie/list?api_key=c9b1e7036fc2d196fc392fadac54777d&language=en-US`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      // ...
    },
  });

export default genresItemGetter;
