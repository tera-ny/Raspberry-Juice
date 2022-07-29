import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface Subscription {
  uid?: string;
}

type Atom = {
  subscription?: Subscription;
  requestsToDisplayAuthModal: boolean;
};

export const authState = atom<Atom>({
  key: "auth",
  default: { subscription: undefined, requestsToDisplayAuthModal: false },
});

export const uidState = selector<string | undefined>({
  key: "auth/uid",
  get: ({ get }) => get(authState)?.subscription?.uid,
});

export const isSubscribedState = selector<boolean>({
  key: "auth/isSubscribed",
  get: ({ get }) => get(authState)?.subscription !== undefined,
});

export const isDisplayedAuthModal = selector<boolean>({
  key: "auth/isDisplayedAuthModal",
  get: ({ get }) =>
    get(authState).requestsToDisplayAuthModal && get(isSubscribedState) &&
    !get(uidState),
});

export const useSwitchDisplayAuthModal = () => {
  const request = useSetRecoilState(authState);
  return (open: boolean) =>
    request((atom) => ({
      ...atom,
      requestsToDisplayAuthModal: open,
    }));
};

export const useListenAuth = () => {
  const setAuth = useSetRecoilState(authState);
  const isSubscribed = useRecoilValue(isSubscribedState);
  useEffect(() => {
    if (isSubscribed) return;
    const auth = getAuth();
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuth((atom) => ({
        ...atom,
        requestsToDisplayAuthModal: user?.uid
          ? false
          : atom.requestsToDisplayAuthModal,
        subscription: { uid: user?.uid ?? undefined },
      }));
    });
    return () => {
      unsubscribe();
      setAuth((atom) => ({ ...atom, subscription: undefined }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  atom: authState,
  selector: {
    uid: uidState,
    isSubscribed: isSubscribedState,
  },
  effect: {
    useListenAuth,
  },
};
