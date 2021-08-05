import { FC, useEffect, useState, lazy, Suspense } from "react"
import auth from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"
import "firebase/firestore"
import { Video } from "~/modules/entity"
import { useRouter } from "next/dist/client/router"

const Player = lazy(() => import("~/components/player"))

const Index: FC = () => {
  const router = useRouter()
  const uid = useRecoilValue(auth.selector.uid)
  const [video, setVideo] = useState<Video>()
  auth.effect.listenCDNSession()
  useEffect(() => {
    const id = router.query.id
    if (!(uid && id && typeof id === "string")) return
    let mounted = true
    ;(async () => {
      const snapshot = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("contents")
        .doc(id)
        .get()
      if (mounted) {
        const data = snapshot.data()
        setVideo({
          title: data.title,
          url: data.url,
          id: id,
          poster: data.poster,
        })
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
              <Suspense fallback={<div>loading...</div>}>
                <Player src={video.url} poster={video.poster} />
              </Suspense>
            </div>
            <h2>{video.title}</h2>
          </div>
        </div>
      )}
      <script src="https://cdn.jsdelivr.net/npm/hls.js@latest" />
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
