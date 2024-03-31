import React from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import SearchControls from "src/SearchControls";
import ImageSearchResults from "src/ImageSearchResults";
import SearchFiltersContext from "src/context/SearchFiltersContext";

const App: React.FC = () => {
  return (
    <SearchFiltersContext>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper
          variant="elevation"
          elevation={16}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography variant="h5" textAlign="center">
            Unsplash Photo Browser
          </Typography>
          <SearchControls />
          <ImageSearchResults />
        </Paper>
      </Container>
    </SearchFiltersContext>
  );
};

export default App;
