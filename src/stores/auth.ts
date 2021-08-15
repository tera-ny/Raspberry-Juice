import {
  atom,
  DefaultValue,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from "recoil"
import { useEffect } from "react"

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

const cdnSessionExpiresState = selector<number | undefined>({
  key: "auth/expires",
  get: ({ get }) => get(authState)?.subscription?.cdnSessionExpires,
  set: ({ set }, newVal) =>
    set(authState, (current) => ({
      subscription: {
        uid: current.subscription.uid,
        cdnSessionExpires: newVal instanceof DefaultValue ? undefined : newVal,
      },
    })),
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
    let unsubscribe: () => void = () => {}
    ;async () => {
      unsubscribe = await import("~/modules/firebase").then((firebase) => {
        return firebase.default.auth().onAuthStateChanged((user) => {
          setAuth((atom) => ({
            ...atom,
            subscription: { uid: user?.uid ?? undefined },
          }))
        })
      })
    }
    return () => {
      unsubscribe()
      setAuth((atom) => ({ ...atom, subscription: undefined }))
    }
  }, [])
}

const fetchCDNSessionToken = async (token: string) => {
  const response = await fetch("/api/storagesession", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data.expires as number
}

export default {
  atom: authState,
  selector: {
    uid: uidState,
    isSubscribed: isSubscribedState,
    sessionExpires: cdnSessionExpiresState,
  },
  effect: {
    listenAuth,
  },
}
