import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { Timestamp } from "firebase/firestore";
import { HeaderTemplate } from "~/components/header";
import { recoilProvider } from "~/decorators/recoil";

type Story = ComponentStoryObj<typeof HeaderTemplate>;
type Meta = ComponentMeta<typeof HeaderTemplate>;

export default {
  component: HeaderTemplate,
  decorators: [recoilProvider],
} as Meta;

export const Default: Story = {};

export const ShouldLogin: Story = {
  args: {
    isSubscribed: true,
  },
};

export const LoggedIn: Story = {
  args: {
    isSubscribed: true,
    uid: "xxxx",
    currentUser: {
      id: "xxxx",
      name: "logged in user",
      description: "",
      registeredAt: Timestamp.now(),
      isActive: true,
      isBanned: false,
      theme: 0,
    },
  },
};
