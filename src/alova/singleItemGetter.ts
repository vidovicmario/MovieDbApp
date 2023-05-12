import alovaInstance from "./index";

const singleItemGetter = (id: number) =>
  alovaInstance.Get(`/users/${id}`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    params: {
      // ...
    },
  });

export default singleItemGetter;
