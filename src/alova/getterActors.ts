import alovaInstance from "./index";

const actorsGetter = (id: number) =>
  alovaInstance.Get(`movie/${id}/credits?api_key=c9b1e7036fc2d196fc392fadac54777d`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      _id: id,
    },
  });

export default actorsGetter;
