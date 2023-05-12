import alovaInstance from "./index";

const listGetter = (startPage: number, pageSize: number, genre: string) =>
  alovaInstance.Get(`discover/movie?api_key=c9b1e7036fc2d196fc392fadac54777d`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      page: startPage,
      _limit: pageSize,
      with_genres: genre
      // ...
    },
    transformData(rawData: any) {
      return rawData.results.map((item: any) => {
        return { ...item, poster_path: `http://image.tmdb.org/t/p/w500${item.poster_path}` };
      });
    },
  });

export default listGetter;
