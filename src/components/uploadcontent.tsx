import { useAuthUser } from "next-firebase-auth"
import {
  ChangeEvent,
  DragEvent,
  FC,
  useCallback,
  useEffect,
  // useEffect,
  useRef,
  useState,
} from "react"
import { Policy } from "~/modules/uploadpolicy"

var timeoutID: any

const UploadContent: FC = () => {
  const user = useAuthUser()

  const field = useRef<HTMLDivElement>()
  const [isDragOver, setIsDragOver] = useState(false)

  const [file, setFile] = useState<File>()
  const [policy, setPolicy] = useState<Policy>()
  const [id, setID] = useState<string>()

  const changeUploadTarget = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files.length !== 1) return
    const file = e.target.files.item(0)
    setFile(file)
  }, [])
  const dragOverHandler = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    field.current.classList.add("dragover")
    setIsDragOver(true)
    timeoutID = setTimeout(function () {
      field.current.classList.remove("dragover")
      setIsDragOver(false)
    }, 100)
  }, [])
  const dropFile = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    let file: File
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      file = e.dataTransfer.items[0].getAsFile()
    } else if (e.dataTransfer.files.length > 0) {
      file = e.dataTransfer.files[0]
    } else {
      return
    }
    if (file.type !== "video/mp4") return
    setFile(file)
  }, [])
  useEffect(() => {
    setPolicy(undefined)
    setID(undefined)
    if (!file) return
    user
      .getIdToken()
      .then((token) =>
        fetch("/api/pre_upload_content", { headers: { Authorization: token } })
      )
      .then((res) => res.json())
      .then((json) => {
        setPolicy(json.policy)
        setID(json.id)
      })
  }, [file])

  const submit = useCallback(() => {
    if (policy) {
      const form = document.getElementById("form") as HTMLFormElement
      form.submit()
    }
  }, [policy])
  return (
    <>
      <h2 className="title">コンテンツをアップロード</h2>
      <div
        ref={field}
        onDrop={dropFile}
        onDragOver={dragOverHandler}
        className="field">
        {file && (
          <video
            height="100%"
            className="video"
            src={URL.createObjectURL(file)}
            controls></video>
        )}
        {!file && (
          <>
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
          </>
        )}
        <form
          id={"form"}
          action={policy?.url}
          method="post"
          encType="multipart/form-data">
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
                name="file"
                type="file"
                className="picker"
                accept="video/mp4,.mp4"
                onChange={changeUploadTarget}
              />
            </label>
            <p>or</p>
            <p>この枠内にファイルをドロップ</p>
          </div>
        </form>
      </div>
      {file && (
        <button className="upload" onClick={submit}>
          アップロード
        </button>
      )}
      <style jsx>
        {`
          .title {
            font-size: 16px;
            font-weight: bold;
          }
          .field {
            margin-top: 24px;
            display: flex;
            align-items: center;
            flex-direction: column;
            border: 1px solid #c4c4c4;
            border-radius: 4px;
            justify-content: center;
            width: 100%;
            height: 351px;
          }
          .field.dragover {
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
