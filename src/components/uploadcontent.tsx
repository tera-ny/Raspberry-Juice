import { useAuthUser } from "next-firebase-auth"
import { useRouter } from "next/router"
import {
  ChangeEvent,
  DragEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { Policy } from "~/modules/uploadpolicy"
import firebase from "firebase/app"
import "firebase/firestore"

var timeoutID: any

interface Props {
  onChangeIsUploading?: (uploading: boolean) => void
}

const UploadContent: FC<Props> = ({ onChangeIsUploading }) => {
  const user = useAuthUser()

  const form = useRef<HTMLFormElement>()
  const [isDragOver, setIsDragOver] = useState(false)

  const [file, setFile] = useState<File>()
  const [policy, setPolicy] = useState<Policy>()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [count, setCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [total, setToatal] = useState(0)
  const [id, setID] = useState<string>()
  const [isUploaded, setIsUploaded] = useState(false)

  const router = useRouter()

  const changeUploadTarget = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length !== 1) return
    const file = e.target.files.item(0)
    setFile(file)
  }, [])
  const dragOverHandler = useCallback((e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    form.current.classList.add("dragover")
    setIsDragOver(true)
    timeoutID = setTimeout(function () {
      form.current.classList.remove("dragover")
      setIsDragOver(false)
    }, 100)
  }, [])
  const dropFile = useCallback(
    (e: DragEvent<HTMLFormElement>) => {
      e.preventDefault()
      let file: File
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        file = e.dataTransfer.items[0].getAsFile()
      } else if (e.dataTransfer.files.length > 0) {
        file = e.dataTransfer.files[0]
      } else {
        return
      }
      if (file.type !== "video/mp4" || isUploading) return
      setFile(file)
    },
    [isUploading]
  )
  useEffect(() => {
    setPolicy(undefined)
    user
      .getIdToken()
      .then((token) =>
        fetch("/api/upload_policy", { headers: { Authorization: token } })
      )
      .then((res) => res.json())
      .then((json) => {
        setPolicy(json.policy)
        setID(json.id)
      })
  }, [user])

  useEffect(() => {
    if (!id) return
    const unsubscribe = firebase
      .firestore()
      .collection("contents")
      .doc(id)
      .onSnapshot((snapshot) => {
        const data = snapshot.data()
        if (snapshot.exists && data && !data.draft) {
          router.push({ pathname: "/contents/" + id, query: { edit: true } })
        }
      })
    return () => {
      unsubscribe()
    }
  }, [id, router])

  useEffect(() => {
    if (policy && !isUploading && file) {
      setIsUploading(true)
      const request = new XMLHttpRequest()
      const data = new FormData(form.current)
      request.open("POST", policy.url)
      request.send(data)
      request.addEventListener("error", () => {
        console.error(request.status)
        setIsUploading(false)
        setFile(undefined)
      })
      request.addEventListener("progress", (e) => {
        setProgress(e.loaded)
      })
      request.addEventListener("loadstart", (e) => {
        setToatal(e.total)
      })
      request.addEventListener("load", () => {
        setIsUploaded(true)
        setIsUploading(false)
      })
    }
  }, [file, policy, isUploading])
  useEffect(() => {
    onChangeIsUploading(isUploading)
  }, [isUploading, onChangeIsUploading])
  useEffect(() => {
    if (isUploading) {
      setCount(0)
      const interval = setInterval(() => {
        setCount((prev) => (prev < 4 ? prev + 1 : 0))
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [isUploading])

  if (!policy) {
    return <></>
  }

  return (
    <>
      <h2 className="title">コンテンツをアップロード</h2>
      <form
        className={`form${isDragOver ? " dragover" : ""}`}
        ref={form}
        onDrop={dropFile}
        onDragOver={dragOverHandler}
        action={policy?.url}
        method="post"
        encType="multipart/form-data">
        <picture className="uploadContentLogo">
          <source
            srcSet={"/img/upload_content_dark.svg"}
            media="(prefers-color-scheme: dark)"
          />
          <img
            height="94"
            width="152"
            alt="upload content"
            src={"/img/upload_content_light.svg"}
          />
        </picture>
        <>
          {Object.keys(policy.fields).map((name, key) => (
            <input
              key={key}
              name={name}
              value={policy.fields[name]}
              type="hidden"
            />
          ))}
        </>
        <div className="meta">
          {!(isUploading || isUploaded) && (
            <>
              <label className="pickerButton">
                アップロードする動画を{file ? "変更" : "選択"}
                <input
                  disabled={isUploading}
                  name="file"
                  type="file"
                  className="picker"
                  accept="video/mp4,.mp4"
                  onChange={changeUploadTarget}
                />
              </label>
              <p>or</p>
              <p>この枠内にファイルをドロップ</p>
            </>
          )}
          {isUploaded && <p>ファイナライズ中...</p>}
          {!isUploaded && isUploading && (
            <>
              <p>アップロード中{".".repeat(count)}</p>
              <p>
                {progress} / {total}
              </p>
              <p>タブを閉じずにこのままお待ちください</p>
            </>
          )}
        </div>
      </form>
      <style jsx>
        {`
          .title {
            font-size: 16px;
            font-weight: bold;
          }
          .form {
            margin-top: 24px;
            display: flex;
            align-items: center;
            flex-direction: column;
            border: 1px solid #c4c4c4;
            border-radius: 4px;
            justify-content: center;
            width: 100%;
            height: calc(100% - 48px);
          }
          .form.dragover {
            border-color: #43b6e5;
          }
          .video {
            object-fit: cover;
            max-height: 220px;
            max-width: 100%;
            padding: 0 20px;
            box-sizing: border-box;
          }
          .uploadContentLogo {
            margin: 63px 0;
            user-select: none;
            pointer-events: none;
            vertical-align: top;
          }
          .uploadContentLogo img {
            vertical-align: top;
          }
          .meta {
            margin-top: 20px;
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            text-align: center;
          }
          .meta {
            font-size: 12px;
          }
          .pickerButton {
            user-select: none;
            cursor: pointer;
            border: none;
            outline: none;
            padding: 8px 12px;
            color: white;
            background-color: #1d72af;
            border-radius: 4px;
          }
          .picker {
            display: none;
          }
          .pickerButton:hover {
            background-color: #1e88d4;
          }
          .pickerButton:active {
            background-color: #3e9ce0;
          }
          .upload {
            cursor: pointer;
            border: none;
            outline: none;
            position: absolute;
            bottom: 12px;
            right: 20px;
            color: white;
            background-color: #ce4b5a;
            font-weight: bold;
            font-size: 14px;
            padding: 8px 12px;
            border-radius: 4px;
          }

          @media (min-width: 600px) {
            .upload {
              bottom: 28px;
              right: 52px;
            }
          }
        `}
      </style>
    </>
  )
}

export default UploadContent
