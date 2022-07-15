import { FC, PropsWithChildren } from "react";
import { useListenAuth } from "~/stores/auth";

const Auth: FC<PropsWithChildren> = ({ children }) => {
  useListenAuth();
  return <>{children}</>;
};

export default Auth;
