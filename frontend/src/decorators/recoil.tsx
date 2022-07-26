import { DecoratorFn } from "@storybook/react";
import { RecoilRoot } from "recoil";

export const recoilProvider: DecoratorFn = (Story) => {
  return (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  );
};
