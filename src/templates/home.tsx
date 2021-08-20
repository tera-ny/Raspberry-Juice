import { FC, useEffect, useState } from "react"
import auth from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"
import "firebase/firestore"
import Link from "next/link"
import { Video } from "~/modules/entity"

const Template: FC = () => {
  const uid = useRecoilValue(auth.selector.uid)
  const [videos, setVideos] = useState<Video[]>([])
  const isSubscribed = useRecoilValue(auth.selector.isSubscribed)

  useEffect(() => {
    if (!uid) return
    let mounted = true
    const _ = (async () => {
      const snapshots = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .collection("contents")
        .where("type", "==", "video")
        .get()
      if (mounted) {
        setVideos(
          snapshots.docs.map((doc) => {
            const data = doc.data()
            return {
              id: doc.id,
              title: data.title,
              url: data.url,
              poster: data.poster,
            }
          })
        )
      }
    })()
    return () => {
      mounted = false
    }
  }, [uid])
  if (!isSubscribed) return <></>
  return (
    <>
      <div>
        {videos.map((video, index) => (
          <div className="content" key={index}>
            <Link
              href={{
                pathname: "/contents/video",
                query: {
                  id: video.id,
                },
              }}>
              <a>{video.title}</a>
            </Link>
          </div>
        ))}
      </div>
      <style jsx>{`
        .content {
          max-width: 300px;
        }
      `}</style>
    </>
  )
}

export default Template
