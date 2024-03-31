import React, { useContext } from "react";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import { useGetPhotos } from "src/hooks/useGetPhotos";
import { SearchFiltersContext } from "src/context/SearchFiltersContext";

const ImageSearchResults: React.FC = () => {
  const { searchKeywords, searchFilter } = useContext(SearchFiltersContext);

  const { photos, totalPages, page, setPage } = useGetPhotos({
    searchKeywords,
    searchFilter,
  });

  return (
    <>
      <Grid container spacing={2}>
        {photos &&
          photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <img
                src={photo.urls.thumb}
                alt={photo.user.username}
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        color="primary"
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, page) => setPage(page)}
      />
    </>
  );
};

export default ImageSearchResults;
