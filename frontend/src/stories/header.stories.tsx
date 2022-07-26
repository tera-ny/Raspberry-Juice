import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Header from "~/components/header";
import { recoilProvider } from "~/decorators/recoil";
import { authState } from "~/stores/auth";
import { profileState } from "~/stores/profile";

type Story = ComponentStory<typeof Header>;
type Meta = ComponentMeta<typeof Header>;

export default {
  component: Header,
  decorators: [recoilProvider],
} as Meta;

export const Default: Story = () => {
  return <Header />;
};

export const ShouldLogin: Story = () => {
  const setAuth = useSetRecoilState(authState);
  useEffect(() => {
    setAuth({ subscription: {}, openAuthModalRequest: false });
  }, []);
  return <Header />;
};

export const LoggedIn: Story = () => {
  const setAuth = useSetRecoilState(authState);
  const setProfile = useSetRecoilState(profileState);
  useEffect(() => {
    setAuth({ subscription: { uid: "xxxx" }, openAuthModalRequest: false });
    setProfile({
      currentUser: {
        name: "logged in user",
        description: "",
        isActive: true,
        isBanned: false,
        registeredAt: Timestamp.now(),
        theme: 0,
      },
    });
  }, []);
  return <Header />;
};
