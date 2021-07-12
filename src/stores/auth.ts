import { atom, selector, useRecoilState } from "recoil"
import firebase from "~/modules/firebase"
import { useEffect } from "react"

interface Subscription {
  uid?: string
}

interface Atom {
  subscription?: Subscription
}

const state = atom<Atom>({
  key: "auth",
  default: undefined,
})

const uid = selector<string | undefined>({
  key: "auth/uid",
  get: ({ get }) => get(state).subscription?.uid,
})

const isSubscribed = selector<boolean>({
  key: "auth/uid",
  get: ({ get }) => get(state).subscription !== undefined,
})

export const subscribeAuth = () => {
  const [uid, setAuth] = useRecoilState(state)
  useEffect(() => {
    if (uid) return
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth({
        subscription: { uid: user?.uid },
      })
    })
    return () => {
      unsubscribe()
      setAuth({})
    }
  }, [])
}

export default {
  atom: state,
  selector: {
    uid,
    isSubscribed,
  },
  effect: {
    subscribeAuth,
  },
}
