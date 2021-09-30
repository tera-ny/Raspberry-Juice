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
  const [isDraft, setIsDraft] = useState<boolean>()
  const [video, setVideo] = useState<EditingVideo>()
  const router = useRouter()
  const [title, setTitle] = useState<string>()
  const [description, setDescription] = useState<string>()
  const user = useAuthUser()
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
            setIsDraft(data.draft)
            setVideo(convert(data))
          } else {
            router.replace("/")
          }
        },
        () => {
          router.replace("/")
        }
      )
    return () => {
      unsubscribe()
    }
  }, [id])

  const submitProfile = useCallback(async () => {
    const token = await user.getIdToken()
    fetch(`/api/content_profile?id=${id}`, {
      method: "PUT",
      headers: {
        authorization: token,
      },
      body: JSON.stringify({ title, description }),
    }).then(() => {
      router.replace("/")
    })
  }, [title, description, id])

  if (video === undefined && isDraft === undefined) return <></>
  if (isDraft) {
    return <>アップロード処理中....</>
  }

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
          <div className="target">
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
          </div>
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
                  setTitle(e.target.value)
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
                  setDescription(e.target.value)
                }}
              />
            </div>
          </div>
          <button
            className="updateButton"
            disabled={!video}
            onClick={submitProfile}>
            更新する
          </button>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 274px 1fr;
          gap: 38px;
          height: 100%;
          grid-template-rows: 24px auto;
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
        .target {
          background-color: #f8f8f8;
          margin-top: 30px;
          border-radius: 4px;
          padding-bottom: 12px;
        }
        .sectionTitle {
          font-weight: 500;
          font-size: 18px;
          padding-bottom: 8px;
        }
        .secondaryContent {
          display: flex;
          flex-direction: column;
        }
        .meta {
          padding: 0 4px;
        }
        .sectionTitle:not(:first-child) {
          padding-top: 16px;
        }
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
        textarea {
          resize: vertical;
          padding: 8px;
          max-height: 350px;
        }
        p {
          font-size: 12px;
          padding-bottom: 8px;
        }
        .target h3 {
          font-weight: 500;
          font-size: 14px;
          padding-top: 4px;
          padding-left: 8px;
        }
        button {
          outline: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .genereButton {
          background-color: #d0693e;
          border-radius: 4px;
          padding: 2px 8px;
          font-size: 12px;
          font-weight: 500;
        }
        .genereButton:hover {
          background-color: #e36e3d;
        }
        .genereButton:active {
          background-color: #d3754d;
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
          font-size: 14px;
          padding: 8px;
          font-weight: bold;
        }

        .updateButton {
          background-color: transparent;
          padding: 8px 32px;
          font-weight: 700;
          font-size: 14px;
          border-radius: 20px;
          margin-top: auto;
          margin-left: auto;
        }
        .updateButton:hover {
          background-color: #e6aa11;
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
