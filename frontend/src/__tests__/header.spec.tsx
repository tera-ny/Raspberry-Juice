import * as stories from "~/stories/header.stories";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { composeStory } from "@storybook/react";
import user from "@testing-library/user-event";
import { vi } from "vitest";

const cases: [stories: keyof typeof stories][] = [
  ["Default"],
  ["ShouldLogin"],
  ["LoggedIn"],
];

describe("Header component", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe.each(cases)("%s", (story) => {
    const Story = composeStory(stories[story], stories.default);

    it("render component", () => {
      const { container } = render(<Story />);

      expect(container.firstChild).toMatchSnapshot();
    });

    if (story === "Default") {
      it("hidden state components", () => {
        const { queryByText, queryByRole } = render(<Story />);

        expect(queryByRole("button", { name: "Login" })).toBeNull();
        expect(queryByText("logged in user")).toBeNull();
      });
    }

    if (story === "LoggedIn") {
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

      it("call toggle auth modal request", () => {
        const request = vi.fn();

        const { getByRole } = render(<Story requestLoginModal={request} />);

        expect(request).not.toHaveBeenCalled();
        user.click(getByRole("button", { name: "Login" }));
        expect(request).toHaveBeenCalled();
      });
    }
  });
});
