import { useAuthUser } from "next-firebase-auth"
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
    if (!file) return
    user
      .getIdToken()
      .then((token) =>
        fetch("/api/pre_upload_content", { headers: { Authorization: token } })
      )
      .then((res) => res.json())
      .then((json) => {
        setPolicy(json.policy)
      })
  }, [file])

  useEffect(() => {
    if (policy) {
      setIsUploading(true)
      form.current.submit()
    }
  }, [policy, form])
  useEffect(() => {
    onChangeIsUploading(isUploading)
  }, [isUploading])
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
  return (
    <>
      <h2 className="title">コンテンツをアップロード</h2>
      <form
        className={"form"}
        ref={form}
        onDrop={dropFile}
        onDragOver={dragOverHandler}
        action={policy?.url}
        method="post"
        encType="multipart/form-data">
        <picture className="uploadContentLogo">
          <source
            srcSet={
              isDragOver
                ? "/img/upload_content_active.svg"
                : "/img/upload_content_dark.svg"
            }
            media="(prefers-color-scheme: dark)"
          />
          <img
            height="94"
            width="152"
            src={
              isDragOver
                ? "/img/upload_content_active.svg"
                : "/img/upload_content_light.svg"
            }
          />
        </picture>
        {policy && (
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
        )}
        <div className="meta">
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
          {!isUploading && (
            <>
              <p>or</p>
              <p>この枠内にファイルをドロップ</p>
            </>
          )}
          {isUploading && (
            <>
              <p>アップロード中{".".repeat(count)}</p>
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
          .from.dragover {
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
            visibility: ${isUploading ? "hidden" : "visible"};
            user-select: none;
            cursor: pointer;
            border: none;
            outline: none;
            padding: 8px 12px;
            color: white;
            background-color: #d0693e;
            border-radius: 4px;
          }
          .picker {
            display: none;
          }
          .pickerButton:hover {
            background-color: #e36e3d;
          }
          .pickerButton:active {
            background-color: #d3754d;
          }
          .upload {
            cursor: pointer;
            border: none;
            outline: none;
            position: absolute;
            bottom: 12px;
            right: 20px;
            color: white;
            background-color: #e6aa11;
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
