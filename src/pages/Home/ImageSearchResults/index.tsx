import React, { useContext, useState } from "react";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetPhotos } from "src/hooks/useGetPhotos";
import { SearchFiltersContext } from "src/context/SearchFiltersContext";
import PhotoDetailsDialog from "./PhotoDetailsDialog";

const ImageSearchResults: React.FC = () => {
  const { searchKeywords, searchFilter } = useContext(SearchFiltersContext);

  const {
    photos,
    totalPages,
    page,
    setPage,
    isLoading,
    errorMessage,
    isTyping,
  } = useGetPhotos({
    searchKeywords,
    searchFilter,
  });

  const [photoDetailsIndex, setPhotoDetailsIndex] = useState(-1);

  const onPhotoClick = (index: number) => {
    setPhotoDetailsIndex(index);
  };

  const centeredContent = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 500,
  };

  if (isLoading || isTyping) {
    return (
      <Box sx={centeredContent}>
        <CircularProgress size={30} color="inherit" />
      </Box>
    );
  }

  if (photos.length === 0 && !searchKeywords) {
    return (
      <Box sx={centeredContent}>
        <Typography>Enter a query above to search Unsplash photos!</Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box sx={centeredContent}>
        <Typography>{errorMessage}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minHeight: 500,
        }}
      >
        <Grid container spacing={2}>
          {photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <img
                src={photo.urls.thumb}
                alt={photo.user.username}
                style={{ width: "100%" }}
                onClick={() => onPhotoClick(index)}
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
      </Box>
      {photos.length > 0 && (
        <PhotoDetailsDialog
          isOpen={photoDetailsIndex >= 0}
          onCloseButtonClick={() => setPhotoDetailsIndex(-1)}
          photo={photos[photoDetailsIndex]}
        />
      )}
    </>
  );
};

export default ImageSearchResults;
