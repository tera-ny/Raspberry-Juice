import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil"
import firebase from "~/modules/firebase"
import { useEffect } from "react"

interface Subscription {
  uid?: string
}

interface Atom {
  subscription?: Subscription
}

const authState = atom<Atom>({
  key: "auth",
  default: {},
})

const uidState = selector<string | undefined>({
  key: "auth/uid",
  get: ({ get }) => get(authState).subscription?.uid,
})

const isSubscribedState = selector<boolean>({
  key: "auth/isSubscribed",
  get: ({ get }) => get(authState).subscription !== undefined,
})

export const useListenAuth = () => {
  const setAuth = useSetRecoilState(authState)
  const isSubscribed = useRecoilValue(isSubscribedState)
  useEffect(() => {
    if (isSubscribed) return
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setAuth((atom) => ({
        ...atom,
        subscription: { uid: user?.uid ?? undefined },
      }))
    })
    return () => {
      unsubscribe()
      setAuth((atom) => ({ ...atom, subscription: undefined }))
    }
  }, [])
}

export default {
  atom: authState,
  selector: {
    uid: uidState,
    isSubscribed: isSubscribedState,
  },
  effect: {
    useListenAuth,
  },
}
