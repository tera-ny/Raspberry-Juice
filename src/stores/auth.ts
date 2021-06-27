import { atom, selector, useRecoilState } from "recoil";
import { useEffect } from 'react'
import firebase from "~/modules/firebase";
import "firebase/auth";

interface Subscription {
  uid?: string
}

interface Atom {
  subscription?: Subscription
}

const state = atom<Atom>({
  key: "auth",
  default: {},
});

export const uidSelector = selector({
  key: "auth/uid", get: ({ get }) =>
    get(state).subscription?.uid
})

export const useListenAuth = () => {
  const [auth, setAuth] = useRecoilState(state)
  useEffect(() => {
    if (auth.subscription) return
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth(atom => ({ ...atom, subscription: { uid: user?.uid ?? undefined } }))
    })
    return () => {
      unsubscribe()
      setAuth(atom => ({ ...atom, subscription: undefined }))
    }
  }, [])
}

export default state;
