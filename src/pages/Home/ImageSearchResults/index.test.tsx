import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import mockedFirstPageData from "src/mockedData/firstPage.json";
import ImageSearchResults from ".";
import { SearchFiltersContext } from "src/context/SearchFiltersContext";
import { SearchFilter } from "src/types";
import * as useGetPhotos from "src/hooks/useGetPhotos";

vi.mock("unsplash-js", () => ({
  createApi: () => ({ search: { getPhotos: () => mockedFirstPageData } }),
}));

const photos = mockedFirstPageData.response.results;

describe("ImageSearchResults", () => {
  it("Shows photos after searching a query", async () => {
    render(
      <SearchFiltersContext.Provider
        value={{
          register: vi.fn(),
          searchFilter: SearchFilter.relevant,
          searchKeywords: "cats",
        }}
      >
        <ImageSearchResults />
      </SearchFiltersContext.Provider>
    );

    const lastPaginationButton = await screen.findByText("1667");
    const photos = screen.getAllByRole("img");

    expect(lastPaginationButton).toBeVisible();
    expect(photos).toHaveLength(mockedFirstPageData.response.results.length);
  });

  it("Paginates to the next page when a number button is clicked", async () => {
    const setPageSpy = vi.fn();
    vi.spyOn(useGetPhotos, "useGetPhotos").mockImplementationOnce(() => ({
      photos,
      totalPages: 2,
      page: 1,
      isLoading: false,
      errorMessage: "",
      isTyping: false,
      setPage: setPageSpy,
    }));

    render(
      <SearchFiltersContext.Provider
        value={{
          register: vi.fn(),
          searchFilter: SearchFilter.relevant,
          searchKeywords: "cats",
        }}
      >
        <ImageSearchResults />
      </SearchFiltersContext.Provider>
    );

    const nextPaginationButton = await screen.findByText("2");

    await userEvent.click(nextPaginationButton);

    expect(setPageSpy).toHaveBeenCalledWith(2);
  });

  it("Opens a larger size of a photo that is clicked", async () => {
    const spy = vi
      .spyOn(useGetPhotos, "useGetPhotos")
      .mockImplementation(() => ({
        photos,
        totalPages: 2,
        page: 1,
        isLoading: false,
        errorMessage: "",
        isTyping: false,
        setPage: vi.fn(),
      }));

    render(
      <SearchFiltersContext.Provider
        value={{
          register: vi.fn(),
          searchFilter: SearchFilter.relevant,
          searchKeywords: "cats",
        }}
      >
        <ImageSearchResults />
      </SearchFiltersContext.Provider>
    );

    const [firstPhoto] = await screen.findAllByRole("img");

    await userEvent.click(firstPhoto);

    const authorText = screen.getByText("theluckyneko");
    const descriptionText = screen.getByText("kittens in basket");

    expect(authorText).toBeVisible();
    expect(descriptionText).toBeVisible();

    spy.mockRestore();
  });
});
