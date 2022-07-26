import * as stories from "~/stories/header.stories";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { composeStory } from "@storybook/react";

const cases: [stories: keyof typeof stories][] = [
  ["Default"],
  ["ShouldLogin"],
  ["LoggedInUser"],
];

describe("Header component", () => {
  describe.each(cases)("%s", (story) => {
    const Story = composeStory(stories[story], stories.default);
    it("render component", () => {
      const { container } = render(<Story />);
      expect(container.firstChild).toMatchSnapshot();
    });
    if (story === "LoggedInUser") {
      it("displayed user name", () => {
        const { queryByText } = render(<Story />);
        expect(queryByText("logged in user")).not.toBeNull();
      });
    }
    if (story === "ShouldLogin") {
      it("displayed login button", () => {
        const { queryByRole, queryByText } = render(<Story />);
        expect(queryByText("logged in user")).toBeNull();
        expect(queryByRole("button", { name: "Login" })).not.toBeNull();
      });
    }
  });
});
