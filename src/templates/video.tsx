import { FC, useEffect, useState } from "react"
import auth from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"
import "firebase/firestore"
import { Video } from "~/modules/entity"
import { useRouter } from "next/dist/client/router"
import Player from "~/components/player"

const Index: FC = () => {
  const router = useRouter()
  const uid = useRecoilValue(auth.selector.uid)
  const [video, setVideo] = useState<Video>()
  useEffect(() => {
    if (!uid) return
    const _ = (async () => {
      const token = await firebase.auth().currentUser.getIdToken()
      await fetch(`/api/session?path=${btoa(`users/${uid}/`)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    })()
  }, [uid])
  useEffect(() => {
    const id = router.query.id
    if (!(uid && id && typeof id === "string")) return
    let mounted = true
    const _ = (async () => {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("contents")
        .doc(id)
        .get()
      if (mounted) {
        const data = snapshot.data()
        setVideo({ title: data.title, url: data.url, id: id })
      }
    })()
    return () => {
      mounted = false
    }
  }, [uid])

  return (
    <>
      {video && (
        <div className={"container"}>
          <div className={"primary"}>
            <div className={"playerContainer"}>
              <Player src={video.url} />
            </div>
            <h2>{video.title}</h2>
          </div>
        </div>
      )}
      <style jsx>{`
        .container {
          margin: 0 auto;
          padding: 40px 20px 0;
          max-width: 900px;
          display: grid;
        }
      `}</style>
    </>
  )
}

export default Index
