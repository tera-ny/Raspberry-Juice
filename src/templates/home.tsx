import { FC, useEffect, useState } from "react"
import auth from "~/stores/auth"
import { useRecoilValue } from "recoil"
import firebase from "~/modules/firebase"
import "firebase/auth"
import "firebase/firestore"
import { Video } from "~/modules/entity"
import Content from "~/components/videocontent"

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
      <div className="container">
        <div className="sectiontitlewrapper">
          <h2 className="sectiontitle">Home</h2>
          <hr className="separator" />
        </div>
        <div className="contents">
          {videos.map((video, index) => (
            <Content video={video} key={index} />
          ))}
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 20px 52px;
        }
        .sectiontitlewrapper {
          padding-bottom: 20px;
        }
        .sectiontitle {
          font-weight: medium;
          font-size: 24px;
          color: #404040;
        }
        .separator {
          margin: 0;
          max-width: 100px;
        }
        .contents {
          display: grid;
          grid-template-columns: repeat(auto-fit, 210px);
          column-gap: 32px;
          row-gap: 24px;
        }
      `}</style>
    </>
  )
}

export default Template
