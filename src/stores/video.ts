import {
  atom,
  useRecoilValue,
  useSetRecoilState,
  useResetRecoilState,
} from "recoil"
import firebase from "~/modules/firebase"
import { useEffect } from "react"
import auth from "~/stores/auth"

interface Atom {
  title: string
  src: string
  id: string
  poster?: string
}

type State =
  | {
      loadState: "loaded"
      video: Atom
    }
  | {
      loadState: "initialized" | "loading"
    }
  | {
      loadState: "error"
      error: number
    }

const videoState = atom<State>({
  key: "video",
  default: { loadState: "initialized" },
})

const listenVideo = (id: string) => {
  const uid = useRecoilValue(auth.selector.uid)
  const setVideo = useSetRecoilState(videoState)
  const resetVideo = useResetRecoilState(videoState)
  useEffect(() => {
    resetVideo()
    if (!(uid && id && typeof id === "string")) return
    setVideo({ loadState: "loading" })
    const unsubscribe = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("contents")
      .doc(id)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data()
            setVideo({
              loadState: "loaded",
              video: {
                title: data.title,
                src: data.url,
                id: id,
                poster: data.poster,
              },
            })
          } else {
            setVideo({ loadState: "error", error: 404 })
          }
        },
        (error) => {
          console.error(error)
          setVideo({ loadState: "error", error: 500 })
        }
      )
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
