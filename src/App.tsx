import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import { useGetPhotos } from "./useGetPhotos";

function App() {
  const { photos } = useGetPhotos({
    searchKeywords: "cat",
  });

  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Paper
        variant="elevation"
        elevation={16}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <h1>Unsplash Photo Browser</h1>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flex: 1 }}>
            <TextField
              required
              id="searchField"
              name="searchField"
              label="Search photos..."
              fullWidth
              variant="standard"
            />
          </Box>
          <Box>
            <FormControl>
              <RadioGroup
                aria-labelledby="filter-radio-buttons-group-label"
                defaultValue="relevant"
                name="filter-radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="relevant"
                  control={<Radio />}
                  label="Relevant"
                />
                <FormControlLabel
                  value="latest"
                  control={<Radio />}
                  label="Latest"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
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
          count={1} // Set the total count of pages
          page={1}
          color="primary"
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      </Paper>
    </Container>
  );
}

export default App;
