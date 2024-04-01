import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomePage from ".";

describe("HomePage", () => {
  it("Renders an empty home page when the variables are all set to their default values", () => {
    render(<HomePage />);

    const headerText = screen.getByText("Unsplash Photo Browser");
    const searchResultText = screen.getByText(
      "Enter a query above to search Unsplash photos!"
    );
    const searchTextField = screen.getByRole("textbox", {
      name: "Search photos...",
    });
    const relevantRadio = screen.getByText("Relevant");
    const latestRadio = screen.getByText("Latest");

    expect(headerText).toBeVisible();
    expect(searchResultText).toBeVisible();
    expect(searchTextField).toBeVisible();
    expect(relevantRadio).toBeVisible();
    expect(latestRadio).toBeVisible();
  });
});
