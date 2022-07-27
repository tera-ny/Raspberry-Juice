import { FC } from "react";

export const LoginButton: FC = () => (
  <>
    <button>
      Login
    </button>
    <style jsx>
      {`
      .loginButton {
        border: 2 solid black;
        background-color: white;
      }
    `}
    </style>
  </>
);
