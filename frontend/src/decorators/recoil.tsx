import { DecoratorFn } from "@storybook/react";
import { RecoilRoot } from "recoil";

export const recoilProvider: DecoratorFn = (Story, context) => {
  return (
    <RecoilRoot>
      <Story />
    </RecoilRoot>
  );
};
