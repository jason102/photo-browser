import React, { useContext } from "react";

import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useGetPhotos } from "src/hooks/useGetPhotos";
import { SearchFiltersContext } from "src/context/SearchFiltersContext";

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

  if (isLoading || isTyping) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 500,
        }}
      >
        <Typography>
          <CircularProgress size={30} color="inherit" />
        </Typography>
      </Box>
    );
  }

  if (photos.length === 0 && !searchKeywords) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 500,
        }}
      >
        <Typography>Enter a query above to search Unsplash photos!</Typography>
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 500,
        }}
      >
        <Typography>{errorMessage}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", flex: 1, flexDirection: "column", minHeight: 500 }}
    >
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
    </Box>
  );
};

export default ImageSearchResults;
