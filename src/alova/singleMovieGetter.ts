import alovaInstance from "./index";

const singleMovieGetter = (id: number) =>
  alovaInstance.Get(
    `/movie/${id}?api_key=c9b1e7036fc2d196fc392fadac54777d&append_to_response=videos`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      params: {
        _id: id,
      },
    }
  );

export default singleMovieGetter;
