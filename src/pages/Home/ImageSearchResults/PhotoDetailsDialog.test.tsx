import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import mockedFirstPageData from "src/mockedData/firstPage.json";
import PhotoDetailsDialog from "./PhotoDetailsDialog";

const photo = mockedFirstPageData.response.results[0];

describe("PhotoDetailsDialog", () => {
  it("Shows a dialog with a photo and closes when clicking the close button", async () => {
    const closeButtonProp = vi.fn();

    render(
      <PhotoDetailsDialog
        isOpen
        photo={photo}
        onCloseButtonClick={closeButtonProp}
      />
    );

    const authorText = screen.getByText("theluckyneko");
    const descriptionText = screen.getByText("kittens in basket");

    expect(authorText).toBeVisible();
    expect(descriptionText).toBeVisible();

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    await userEvent.click(closeButton);

    expect(closeButtonProp).toHaveBeenCalledTimes(1);
  });
});
