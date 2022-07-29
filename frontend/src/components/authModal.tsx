import { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  isDisplayedAuthModal,
  useListenAuth,
  useSwitchDisplayAuthModal,
} from "~/stores/auth";
import SignInTemplate from "~/templates/signin";
import Modal from "./modal";

const AuthModal: FC = () => {
  const isDisplayed = useRecoilValue(isDisplayedAuthModal);
  const switchDisplayModal = useSwitchDisplayAuthModal();
  useListenAuth();
  return (
    <>
      <Modal
        visible={isDisplayed}
        onClickBackground={() => switchDisplayModal(false)}
        width={450}
        height={420}
      >
        <div className="container">
          <SignInTemplate />
        </div>
      </Modal>
      <style jsx>
        {`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }
        `}
      </style>
    </>
  );
};

export default AuthModal;
