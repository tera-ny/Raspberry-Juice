import { FC } from "react";
import Link from "next/link";
import { uidState, useToggleAuthModalRequest } from "~/stores/auth";
import { useRecoilValue } from "recoil";

const Header: FC = () => {
  const toggle = useToggleAuthModalRequest();
  const uid = useRecoilValue(uidState);
  return (
    <>
      <header className="container">
        <Link href={"/"}>
          <a className="link">
            <picture>
              <source
                srcSet="/img/logo_full_dark.svg"
                media="(prefers-color-scheme: dark)"
              />
              <img
                className="logo"
                height="60"
                width="220"
                src="/img/logo_full_light.svg"
                alt="raspberry-juice"
              />
            </picture>
          </a>
        </Link>
        {uid ? <span>logged in: {uid}</span> : (
          <button onClick={() => toggle()}>
            login
          </button>
        )}
      </header>
      <style jsx>
        {`
        .container {
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
        }
        .logo {
          height: 40px;
          width: auto;
        }
        .link {
          display: inline-block;
          height: 40px;
        }
        @media screen and (max-width: 899px) {
          .container {
            padding: 8px 12px;
          }
        }
      `}
      </style>
    </>
  );
};

export default Header;
