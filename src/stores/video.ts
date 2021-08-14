import { atom, useRecoilValue, useSetRecoilState, selector } from "recoil"
import firebase from "~/modules/firebase"
import { useEffect } from "react"
import auth from "~/stores/auth"

interface Atom {
  title: string
  src: string
  id: string
  poster?: string
}

const videoState = atom<Atom>({
  key: "video",
  default: undefined,
})

const listenVideo = (id: string) => {
  const uid = useRecoilValue(auth.selector.uid)
  const setVideo = useSetRecoilState(videoState)
  useEffect(() => {
    if (!(uid && id && typeof id === "string")) return
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("contents")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data()
        setVideo({
          title: data.title,
          src: data.url,
          id: id,
          poster: data.poster,
        })
      })
    return () => {
      unsubscribe()
    }
  }, [id, uid])
}

export default {
  atom: videoState,
  effect: {
    listenVideo,
  },
}
