import { useEffect, useState, useCallback } from "react";
import { createApi } from "unsplash-js";
import { Basic as Photo } from "unsplash-js/dist/methods/photos/types";

const unsplashApi = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

interface Props {
  searchKeywords: string;
}

export const useGetPhotos = ({ searchKeywords }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[] | null>([]);

  const getPhotos = useCallback(async () => {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const photosData = await unsplashApi.search.getPhotos({
        query: searchKeywords,
        orientation: "landscape",
      });

      if (photosData.errors) {
        throw new Error(photosData.errors[0]);
      }

      setPhotos(photosData.response.results);
    } catch (error) {
      // In a real app, report to error logging software instead of console logging it
      console.error(error);
      setErrorMessage("Uh oh, something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [searchKeywords]);

  useEffect(() => {
    getPhotos();
  }, []);

  return { errorMessage, isLoading, photos };
};
