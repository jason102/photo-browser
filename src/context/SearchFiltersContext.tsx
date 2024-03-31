import React, { createContext, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { SearchControlValues, SearchFilter } from "src/types";

export const SearchFiltersContext = createContext({
  register: (_: string) => ({}),
  searchFilter: SearchFilter.relevant,
  searchKeywords: "",
});

interface Props {
  children?: React.ReactNode;
}

const SearchFiltersProvider: React.FC<Props> = ({ children }) => {
  const { register, watch } = useForm<SearchControlValues>({
    defaultValues: { searchKeywords: "", searchFilter: SearchFilter.relevant },
  });

  // register() has a complicated type and is difficult to set a default value
  // for this in createContext() above. We only need to know it returns an object
  // and is passed a string for the field name, so typecasting it here in order for TS
  // to accept it being passed as the provider value.
  const typecastedRegister = register as (field: string) => any;

  const searchFilter = watch("searchFilter");
  const searchKeywords = watch("searchKeywords").trim();

  return (
    <SearchFiltersContext.Provider
      value={{
        register: typecastedRegister,
        searchFilter,
        searchKeywords,
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
};

export default SearchFiltersProvider;
