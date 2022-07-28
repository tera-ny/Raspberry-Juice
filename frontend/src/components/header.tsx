import { FC } from "react";
import Link from "next/link";
import {
  isSubscribedState,
  uidState,
  useOpenAuthModalRequest,
} from "~/stores/auth";
import { useRecoilValue } from "recoil";
import { profileState } from "~/stores/profile";
import { Timestamp } from "firebase/firestore";
import { Profile } from "~/modules/entity";

interface TemplateProps {
  isSubscribed: boolean;
  uid?: string;
  currentUser?: Profile<Timestamp> & { id: string };
  requestLoginModal: () => void;
}

export const HeaderTemplate: FC<TemplateProps> = (
  { isSubscribed, uid, currentUser, requestLoginModal },
) => (
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
      {isSubscribed && !uid && (
        <button onClick={requestLoginModal}>
          Login
        </button>
      )}
      {isSubscribed && uid && uid === currentUser?.id && (
        <span>{currentUser?.name}</span>
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

const Header: FC = () => {
  const openAuthModalRequest = useOpenAuthModalRequest();
  const { currentUser } = useRecoilValue(profileState);
  const uid = useRecoilValue(uidState);
  const isSubscribed = useRecoilValue(isSubscribedState);
  return (
    <HeaderTemplate
      isSubscribed={isSubscribed}
      uid={uid}
      currentUser={currentUser}
      requestLoginModal={() => openAuthModalRequest(true)}
    />
  );
};

export default Header;
