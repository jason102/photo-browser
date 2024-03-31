import { useEffect, useState, useCallback } from "react";
import { SearchFilter } from "src/types";
import { createApi } from "unsplash-js";
import { Basic as Photo } from "unsplash-js/dist/methods/photos/types";

const TYPING_DEBOUNCE_TIME = 500; // Half a second

const unsplashApi = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

interface Props {
  searchKeywords: string;
  searchFilter: SearchFilter;
}

export const useGetPhotos = ({ searchKeywords, searchFilter }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  const getPhotos = useCallback(async () => {
    setErrorMessage("");

    if (!searchKeywords) {
      setPhotos([]);
      return;
    }

    setIsLoading(true);

    try {
      const photosData = await unsplashApi.search.getPhotos({
        query: searchKeywords,
        orientation: "landscape",
        orderBy: searchFilter,
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
  }, [searchKeywords, searchFilter]);

  useEffect(() => {
    // Simple debouncing of the user's typing input
    const timeoutId = setTimeout(() => {
      getPhotos();
    }, TYPING_DEBOUNCE_TIME);

    return () => {
      // Clears the timeout each time the user presses a key
      clearTimeout(timeoutId);
    };
  }, [searchKeywords, searchFilter]);

  return { errorMessage, isLoading, photos };
};
