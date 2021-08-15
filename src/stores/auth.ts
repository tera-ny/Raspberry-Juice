import {
  atom,
  DefaultValue,
  selector,
  useRecoilValue,
  useSetRecoilState,
  waitForAll,
} from "recoil"
import firebase from "~/modules/firebase"
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
  default: { subscription: firebase.auth().currentUser ?? undefined },
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

const fetchCDNSessionToken = async (token: string) => {
  const response = await fetch("/api/storagesession", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data = await response.json()
  return data.expires as number
}

export const listenCDNSession = () => {
  const [uid, expires] = useRecoilValue(
    waitForAll([uidState, cdnSessionExpiresState])
  )
  const setExpires = useSetRecoilState(cdnSessionExpiresState)
  useEffect(() => {
    if (!uid || expires) return
    let mounted = true
    ;(async () => {
      const token = await firebase.auth().currentUser.getIdToken()
      const result = await fetchCDNSessionToken(token)
      if (mounted) {
        setExpires(result)
      }
    })()
    return () => {
      mounted = false
    }
  }, [uid, expires])
  useEffect(() => {
    if (!(uid && expires)) return
    const timeout = setTimeout(async () => {
      const token = await firebase.auth().currentUser.getIdToken()
      const result = await fetchCDNSessionToken(token)
      setExpires(result)
    }, expires * 1000 - Date.now() - 30000)
    return () => {
      clearTimeout(timeout)
    }
  }, [uid, expires])
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
    listenCDNSession,
  },
}
