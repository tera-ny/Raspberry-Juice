import { VFC } from "react";
import { useRecoilValue } from "recoil";
import {
  authState,
  useListenAuth,
  useToggleAuthModalRequest,
} from "~/stores/auth";
import SignInTemplate from "~/templates/signin";
import Modal from "./modal";

const AuthModal: VFC = () => {
  const state = useRecoilValue(authState);
  const toggle = useToggleAuthModalRequest();
  useListenAuth();
  return (
    <>
      <Modal
        visible={!!(state.openAuthModalRequest && !state.subscription?.uid)}
        onClickBackground={() => toggle()}
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
