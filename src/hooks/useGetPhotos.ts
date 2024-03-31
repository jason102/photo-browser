import { useEffect, useState, useRef } from "react";
import { createApi } from "unsplash-js";
import { Basic as Photo } from "unsplash-js/dist/methods/photos/types";

import { SearchFilter } from "src/types";

const TYPING_DEBOUNCE_TIME = 500; // Half a second
const PHOTOS_PER_PAGE = 6;

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

  const [photosPerPage, setPhotosPerPage] = useState<Record<number, Photo[]>>(
    {}
  );
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);

  const previousKeywords = useRef("");
  const previousFilter = useRef(SearchFilter.relevant);

  const getPhotos = async () => {
    setErrorMessage("");

    if (!searchKeywords) {
      setPhotosPerPage({});
      setPage(1);
      return;
    }

    setIsLoading(true);

    const resetToFirstPage =
      previousFilter.current !== searchFilter ||
      previousKeywords.current !== searchKeywords;

    try {
      const photosData = await unsplashApi.search.getPhotos({
        query: searchKeywords,
        orientation: "landscape",
        orderBy: searchFilter,
        page: resetToFirstPage ? 1 : page,
        perPage: PHOTOS_PER_PAGE,
      });

      if (photosData.errors) {
        throw new Error(photosData.errors[0]);
      }

      const { results, total_pages: resultTotalPages } = photosData.response;

      setTotalPages(resultTotalPages);

      if (previousKeywords.current !== searchKeywords) {
        previousKeywords.current = searchKeywords;
      }

      if (previousFilter.current !== searchFilter) {
        previousFilter.current = searchFilter;
      }

      if (resetToFirstPage) {
        setPhotosPerPage({ 1: results });
        setPage(1);
        return;
      }

      setPhotosPerPage((prevPhotosPerPage) => ({
        ...prevPhotosPerPage,
        [page]: results,
      }));
    } catch (error) {
      // In a real app, report to error logging software instead of console logging it
      console.error(error);
      setErrorMessage("Uh oh, something went wrong! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      searchFilter === previousFilter.current &&
      searchKeywords === previousKeywords.current &&
      searchKeywords.length > 0 &&
      !photosPerPage[page]
    ) {
      getPhotos();
    }
  }, [page, searchFilter, searchKeywords, photosPerPage]);

  useEffect(() => {
    getPhotos();
  }, [searchFilter]);

  useEffect(() => {
    // Simple debouncing of the user's typing input
    const timeoutId = setTimeout(() => {
      getPhotos();
    }, TYPING_DEBOUNCE_TIME);

    return () => {
      // Clears the timeout each time the user presses a key
      clearTimeout(timeoutId);
    };
  }, [searchKeywords]);

  return {
    errorMessage,
    isLoading,
    photos: photosPerPage[page] ?? [],
    page,
    setPage,
    totalPages,
  };
};
