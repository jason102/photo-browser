import { useState } from "react";
import { Basic as Photo } from "unsplash-js/dist/methods/photos/types";

import { SearchFilter } from "src/types";
import { fetchUnsplashPhotos } from "src/api/unsplashFetcher";

const PHOTOS_PER_PAGE = 6;

interface Props {
  searchKeywords: string;
  previousKeywords: string;
  searchFilter: SearchFilter;
  previousFilter: SearchFilter;
}

// Photo fetcher that calls the Unsplash API
export const useFetchPaginatedPhotos = ({
  searchFilter,
  searchKeywords,
  previousFilter,
  previousKeywords,
}: Props) => {
  const [photosPerPage, setPhotosPerPage] = useState<Record<number, Photo[]>>(
    {}
  );
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    setErrorMessage("");

    if (!searchKeywords) {
      setPhotosPerPage({});
      setPage(1);
      return;
    }

    setIsLoading(true);

    const resetToFirstPage =
      previousFilter !== searchFilter || previousKeywords !== searchKeywords;

    try {
      const photosData = await fetchUnsplashPhotos({
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

      if (resultTotalPages === 0) {
        setErrorMessage("No photos found for your query. Please try again.");
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

  return {
    fetchPhotos,
    photosPerPage,
    page,
    errorMessage,
    isLoading,
    setPage,
    totalPages,
  };
};
