import { createAlova } from "alova";
import ReactHook from "alova/react";
import GlobalFetch from "alova/GlobalFetch";
const alovaInstance = createAlova({
  // url to interact with
  baseURL: "https://api.themoviedb.org/3/",
  // ReactHook to call useState and create request-related states: loading,  data,  error
  statesHook: ReactHook,
  // request adapter that can be a mock one as well (createAlovaMockAdapter([mockData], {delayTime})),
  requestAdapter: GlobalFetch(),
  //  global request interceptor that will be triggered before the request to add token to the header
  //API_KEY = "c9b1e7036fc2d196fc392fadac54777d"
  // beforeRequest(method) {
  //   method.config.headers.api_key = "c9b1e7036fc2d196fc392fadac54777d";
  // },
  // global response interceptor to handle successful as well as failed requests
  responsed: {
    onSuccess: async (response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      // data that will be passed to the transformData hook
      return await response.json();
    },
    onError: (error) => {
      alert(error.message);
    },
  },
  // global request timeout in milliseconds
  timeout: 50000,
});
export default alovaInstance;
