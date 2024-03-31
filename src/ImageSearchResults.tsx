import React, { useContext } from "react";

import Grid from "@mui/material/Grid";

import { useGetPhotos } from "src/hooks/useGetPhotos";
import { SearchFiltersContext } from "src/context/SearchFiltersContext";

const ImageSearchResults: React.FC = () => {
  const { searchKeywords, searchFilter } = useContext(SearchFiltersContext);
  const { photos } = useGetPhotos({ searchKeywords, searchFilter });

  return (
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
  );
};

export default ImageSearchResults;
