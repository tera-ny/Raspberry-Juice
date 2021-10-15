import { FC, useCallback, useEffect, useState } from "react"
import { EditingVideo, Video } from "~/modules/entity"
import firebase from "firebase/app"
import "firebase/firestore"
import { useRouter } from "next/router"
import { useAuthUser } from "next-firebase-auth"
import dynamic from "next/dynamic"

const Player = dynamic(import("~/components/player"), {
  loading: () => <video></video>,
})

interface Props {
  id: string
  onChangeIsUploading?: (uploading: boolean) => void
}

const convert = (video: Video<firebase.firestore.Timestamp>): EditingVideo => ({
  title: video.title ?? "",
  poster: video.poster,
  description: video.description,
  state: video.state,
  url: typeof video.url === "object" ? video.url.hls : video.url,
})

const EditContent: FC<Props> = ({ id, onChangeIsUploading }) => {
  const [video, setVideo] = useState<EditingVideo>()
  const router = useRouter()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const user = useAuthUser()
  const [isUploading, setIsUploading] = useState(false)
  useEffect(() => {
    setTitle(video?.title)
    setDescription(video?.description)
  }, [video])
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("contents")
      .doc(id)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            const data = snapshot.data() as Video<firebase.firestore.Timestamp>
            if (data.draft) {
              router.replace(router.pathname)
            }
            setVideo(convert(data))
          } else {
            router.replace(router.pathname)
          }
        },
        () => {
          router.replace(router.pathname)
        }
      )
    return () => {
      unsubscribe()
    }
  }, [id, router])

  const submitProfile = useCallback(async () => {
    setIsUploading(true)
    const token = await user.getIdToken()
    fetch(`/api/content_profile?id=${id}`, {
      method: "PUT",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ title, description }),
    })
      .then(() => {
        router.replace("/contents/" + id)
      })
      .catch((error) => {
        console.error(error)
      })
      .then(() => {
        setIsUploading(false)
      })
  }, [title, description, id, user, router])

  useEffect(() => {
    onChangeIsUploading?.(isUploading)
  }, [isUploading, onChangeIsUploading])

  return (
    <>
      <div className="container">
        <h2 className="title">アップロードしたコンテンツを編集</h2>
        <div className="contents">
          {video?.state && video.state === "transcoded" ? (
            <Player
              src={video?.url}
              poster={video?.poster}
              aspectRatio={16 / 9}
            />
          ) : (
            <div className="placeholderWrapper">
              <div className="placeholder">
                {video?.state ? "配信可能な形式に変換中です。" : ""}
              </div>
            </div>
          )}
          {/* <div className="target">
            <h3>制限</h3>
            <div className="form">
              <p>年齢制限のあるコンテンツですか？</p>
              <div className="radio">
                <input name="isAdult" type="radio" id="adult" />
                <label htmlFor="adult">はい。18歳以上が対象です。</label>
              </div>
              <div className="radio">
                <input name="isAdult" type="radio" id="not_adult" />
                <label htmlFor="not_adult">いいえ。全年齢対象です。</label>
              </div>
            </div>
          </div> */}
        </div>
        <div className="secondaryContent">
          <div>
            <h3 className="sectionTitle">タイトル</h3>
            <div className="meta">
              <input
                type="text"
                placeholder="タイトルを入力"
                value={title}
                onChange={(e) => {
                  if (!isUploading) {
                    setTitle(e.target.value)
                  }
                }}
              />
            </div>
            <h3 className="sectionTitle">動画の説明</h3>
            <div className="meta">
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                placeholder="動画の説明を入力"
                value={description}
                onChange={(e) => {
                  if (!isUploading) {
                    setDescription(e.target.value)
                  }
                }}
              />
            </div>
          </div>
          <button
            className="updateButton"
            disabled={!(video && !isUploading)}
            onClick={submitProfile}>
            更新する
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: min(274px, 38%) 1fr;
          row-gap: 38px;
          column-gap: 20px;
          height: 100%;
          grid-template-rows: 24px auto;
          overflow-y: scroll;
        }
        .title {
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          font-family: "Noto Sans JP";
          grid-column: 1/3;
        }
        .placeholderWrapper {
          position: relative;
          width: 100%;
        }
        .placeholderWrapper::before {
          content: "";
          display: block;
          padding-top: 56%;
        }
        .placeholder {
          position: absolute;
          background-color: black;
          display: flex;
          justify-content: center;
          align-items: center;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        /*
        .target {
          background-color: #f8f8f8;
          margin-top: 30px;
          border-radius: 4px;
          padding-bottom: 12px;
        }
        */
        .sectionTitle {
          font-weight: 500;
          font-size: 18px;
          padding-bottom: 8px;
        }
        .secondaryContent {
          display: flex;
          flex-direction: column;
        }
        .sectionTitle:not(:first-child) {
          padding-top: 16px;
        }
        /* 
        .form {
          padding: 12px 20px;
        }
        .radio {
          font-size: 13px;
          padding: 4px;
          align-items: center;
          display: grid;
          grid-template-columns: 13px 1fr;
          gap: 8px;
        }
        */
        textarea {
          resize: vertical;
          padding: 8px;
          max-height: 350px;
        }
        p {
          font-size: 12px;
          padding-bottom: 8px;
        }
        /* .target h3 {
          font-weight: 500;
          font-size: 14px;
          padding-top: 4px;
          padding-left: 8px;
        } */
        button {
          outline: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .meta input,
        textarea {
          width: 100%;
          box-sizing: border-box;
          border: none;
          outline: none;
          background-color: #f8f8f8;
          border-radius: 4px;
        }
        .meta input {
          font-size: 16px;
          padding: 8px;
          font-weight: bold;
        }
        .meta textarea {
          font-size: 14px;
        }

        .updateButton {
          cursor: pointer;
          background-color: #e2495d;
          padding: 8px 32px;
          font-weight: 700;
          font-size: 14px;
          border-radius: 20px;
          margin-top: auto;
          margin-left: auto;
        }
        .updateButton:disabled {
          background-color: #;
        }
        @media (max-width: 700px) {
          .container {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            row-gap: 20px;
          }
          .updateButton {
            margin-top: 20px;
          }
        }
        @media (prefers-color-scheme: dark) {
          .meta input,
          textarea {
            background-color: #2e2f32;
            color: white;
          }
          .target {
            background-color: #1e2026;
          }
        }
      `}</style>
    </>
  )
}

export default EditContent
