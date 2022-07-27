import { FC, PropsWithChildren } from "react";
import { useListenAuth } from "~/stores/auth";
import { useListenProfile } from "~/stores/profile";

const Auth: FC<PropsWithChildren> = ({ children }) => {
  useListenAuth();
  useListenProfile();
  return <>{children}</>;
};

export default Auth;
