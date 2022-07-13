import { FC } from "react";
import { useListenAuth } from "~/stores/auth";

const Auth: FC = ({ children }) => {
  useListenAuth();
  return <>{children}</>;
};

export default Auth;
