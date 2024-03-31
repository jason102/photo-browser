import React, { useContext } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import { SearchFilter } from "src/types";
import { SearchFiltersContext } from "src/context/SearchFiltersContext";

const SearchControls: React.FC = () => {
  const { register } = useContext(SearchFiltersContext);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", mb: 2 }}>
      <Box sx={{ display: "flex", flex: 1, mr: 2 }}>
        <TextField
          {...register("searchKeywords")}
          id="searchKeywords"
          name="searchKeywords"
          label="Search photos..."
          fullWidth
          variant="standard"
        />
      </Box>
      <Box>
        <FormControl>
          <RadioGroup
            aria-labelledby="filter-radio-buttons-group-label"
            name="filter-radio-buttons-group"
            row
            defaultValue={SearchFilter.relevant}
          >
            <FormControlLabel
              {...register("searchFilter")}
              value="relevant"
              control={<Radio />}
              label="Relevant"
            />
            <FormControlLabel
              {...register("searchFilter")}
              value="latest"
              control={<Radio />}
              label="Latest"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default SearchControls;
