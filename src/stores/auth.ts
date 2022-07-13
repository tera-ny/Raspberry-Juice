import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initApp } from "~/modules/firebase";

interface Subscription {
  uid?: string;
  cdnSessionExpires?: number;
}

interface Atom {
  subscription?: Subscription;
}

export const authState = atom<Atom>({
  key: "auth",
  default: { subscription: undefined },
});

export const uidState = selector<string | undefined>({
  key: "auth/uid",
  get: ({ get }) => get(authState)?.subscription?.uid,
});

export const isSubscribedState = selector<boolean>({
  key: "auth/isSubscribed",
  get: ({ get }) => get(authState)?.subscription !== undefined,
});

export const useListenAuth = () => {
  const setAuth = useSetRecoilState(authState);
  const isSubscribed = useRecoilValue(isSubscribedState);
  useEffect(() => {
    if (isSubscribed) return;
    const auth = getAuth();
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuth((atom) => ({
        ...atom,
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
