import { atom, selector, useRecoilState } from "recoil";
import { useEffect } from 'react'
import firebase from "~/modules/firebase";
import "firebase/firestore"
import "firebase/auth";

interface Atom {
  uid?: string
  isSubscribed: boolean
}

const state = atom<Atom>({
  key: "auth",
  default: { isSubscribed: false },
});

export const uidSelector = selector({
  key: "auth/uid", get: ({ get }) =>
    get(state).uid
})

export const useListenAuth = () => {
  const [auth, setAuth] = useRecoilState(state)
  useEffect(() => {
    if (auth.isSubscribed) return
    console.log('mount')
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth(atom => ({ ...atom, uid: user?.uid ?? undefined }))
    })
    setAuth(atom => ({ ...atom, isSubscribed: true }))
    return () => {
      unsubscribe()
      setAuth(atom => ({ ...atom, isSubscribed: false }))
    }
  }, [])
}

export default state;
