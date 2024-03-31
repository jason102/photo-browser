import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export const fetchUnsplashPhotos = unsplashApi.search.getPhotos;
