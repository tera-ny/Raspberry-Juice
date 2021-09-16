import {
  ChangeEvent,
  DragEvent,
  FC,
  useCallback,
  useRef,
  useState,
} from "react"

var timeoutID: any

const UploadContent: FC = () => {
  const [file, setFile] = useState<File>()
  const [isDragOver, setIsDragOver] = useState(false)
  const field = useRef<HTMLDivElement>()
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
        <div className="meta">
          <label className="pickerButton">
            アップロードする動画を選択
            <input
              type="file"
              className="picker"
              accept="video/mp4,.mp4"
              onChange={changeUploadTarget}
            />
          </label>
          <p>or</p>
          <p>この枠内にファイルをドロップ</p>
        </div>
      </div>
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
        `}
      </style>
    </>
  )
}

export default UploadContent
