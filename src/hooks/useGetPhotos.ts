import { useEffect, useState, useRef } from "react";

import { SearchFilter } from "src/types";
import { useFetchPaginatedPhotos } from "./useFetchPaginatedPhotos";

const TYPING_DEBOUNCE_TIME = 500; // Half a second

interface Props {
  searchKeywords: string;
  searchFilter: SearchFilter;
}

// Responsible for determining when to trigger fetching photos
export const useGetPhotos = ({ searchKeywords, searchFilter }: Props) => {
  const [isTyping, setIsTyping] = useState(false);

  const previousKeywords = useRef("");
  const previousFilter = useRef(SearchFilter.relevant);

  const setPreviousProp = () => {
    if (previousKeywords.current !== searchKeywords) {
      previousKeywords.current = searchKeywords;
    }

    if (previousFilter.current !== searchFilter) {
      previousFilter.current = searchFilter;
    }
  };

  const {
    fetchPhotos,
    photosPerPage,
    page,
    errorMessage,
    isLoading,
    setPage,
    totalPages,
  } = useFetchPaginatedPhotos({
    searchFilter,
    searchKeywords,
    previousFilter: previousFilter.current,
    previousKeywords: previousKeywords.current,
  });

  // When the user paginates to another page - if photos for a selected page already exist,
  // directly return them below and avoid calling the API again.
  useEffect(() => {
    const getPhotos = async () => {
      await fetchPhotos();
      setPreviousProp();
    };

    const fetchPagePhotos =
      searchFilter === previousFilter.current &&
      searchKeywords === previousKeywords.current &&
      searchKeywords.length > 0 &&
      !photosPerPage[page];

    if (fetchPagePhotos) {
      getPhotos();
    }
  }, [page, searchFilter, searchKeywords, photosPerPage]);

  // When the search filter radio button is changed
  useEffect(() => {
    const getPhotos = async () => {
      await fetchPhotos();
      setPreviousProp();
    };

    getPhotos();
  }, [searchFilter]);

  // When the user types a search query
  useEffect(() => {
    if (searchKeywords.length > 0) {
      setIsTyping(true);
    }

    // Simple debouncing of the user's typing input
    const timeoutId = setTimeout(() => {
      setIsTyping(false);

      const getPhotos = async () => {
        await fetchPhotos();
        setPreviousProp();
      };

      getPhotos();
    }, TYPING_DEBOUNCE_TIME);

    return () => {
      // Clears the timeout each time the user presses a key
      setIsTyping(false);
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
    isTyping,
  };
};
