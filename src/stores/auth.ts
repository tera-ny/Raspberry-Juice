import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil"
import { useEffect } from "react"
import firebase from "~/modules/firebase"

interface Subscription {
  uid?: string
  cdnSessionExpires?: number
}

interface Atom {
  subscription?: Subscription
}

const authState = atom<Atom>({
  key: "auth",
  default: { subscription: undefined },
})

const uidState = selector<string | undefined>({
  key: "auth/uid",
  get: ({ get }) => get(authState)?.subscription?.uid,
})

const isSubscribedState = selector<boolean>({
  key: "auth/isSubscribed",
  get: ({ get }) => get(authState)?.subscription !== undefined,
})

export const listenAuth = () => {
  const setAuth = useSetRecoilState(authState)
  const isSubscribed = useRecoilValue(isSubscribedState)
  useEffect(() => {
    if (isSubscribed) return
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
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
    listenAuth,
  },
}
