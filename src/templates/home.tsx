import { FC, useCallback, useEffect, useState } from "react"
import auth from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"
import "firebase/firestore"
import Link from "next/link"
import { Video } from "~/modules/entity"

const Template: FC = () => {
  const uid = useRecoilValue(auth.selector.uid)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [videos, setVideos] = useState<Video[]>([])
  const signIn = useCallback(() => {
    firebase.auth().signInWithEmailAndPassword(email, password)
  }, [email, password])

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
            return { id: doc.id, title: data.title, url: data.url }
          })
        )
      }
    })()
    return () => {
      mounted = false
    }
  }, [uid])
  return (
    <>
      {uid ? (
        <div>
          {videos.map((video, index) => (
            <div className="content" key={index}>
              <Link href={`/contents/video/${video.id}`}>
                <a href="">{video.title}</a>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <>
          <input
            type="mail"
            placeholder="mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={signIn}>signin</button>
        </>
      )}
      <style jsx>{`
        .content {
          max-width: 300px;
        }
      `}</style>
    </>
  )
}

export default Template
