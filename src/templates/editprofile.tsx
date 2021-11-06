import React, {
  ChangeEvent,
  FC,
  forwardRef,
  useCallback,
  useMemo,
  useState,
} from "react"
import ThreeDots from "~/components/threedots"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd"
import { WithChildren } from "~/utils/props"
import Trash from "~/components/trash"
import { setTimeout } from "timers"

type ImagePickerProps = {
  id: string
  maxByteSize: number
  onSelectedImage: (file: File) => void
} & WithChildren

const ImagePicker = ({
  children,
  id,
  maxByteSize,
  onSelectedImage,
}: ImagePickerProps) => {
  const onChangeImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files.length < 1) return
      const file = e.target.files.item(0)
      if (file.size <= maxByteSize) {
        onSelectedImage(file)
      }
    },
    [onSelectedImage]
  )
  return (
    <>
      {children}
      <input
        type="file"
        id={id}
        accept="image/png,image/jpeg,image/gif"
        onChange={onChangeImage}
      />
      <style jsx>{`
        input {
          display: none;
        }
        label {
          width: 100%;
        }
      `}</style>
    </>
  )
}

const IconPicker = () => {
  const [file, setFile] = useState<File>(null)
  const id = "icon"
  return (
    <>
      <ImagePicker
        onSelectedImage={setFile}
        maxByteSize={6000000}
        id={id}
        key={file?.name}>
        <label className="container" htmlFor={id}>
          <div className="inner">
            <div className="image">
              <img
                width={114}
                height={114}
                src={file ? URL.createObjectURL(file) : "/api/icon"}
              />
            </div>
          </div>
        </label>
      </ImagePicker>
      {file && (
        <button className="remove" onClick={() => setFile(null)}>
          削除
        </button>
      )}
      <style jsx>{`
        img {
          display: block;
          object-fit: cover;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        .container {
          background-color: #282828;
          width: 100%;
          max-width: 400px;
          display: block;
        }
        .inner {
          padding: 4% 30%;
          box-sizing: border-box;
        }
        .image {
          position: relative;
          width: 100%;
        }
        .image::before {
          content: "";
          padding-bottom: 100%;
          display: block;
        }

        .remove {
          border: none;
          outline: none;
          cursor: pointer;
          background-color: transparent;
          color: var(--secondary-blue-color);
        }
      `}</style>
    </>
  )
}

const BannerPicker = () => {
  const [file, setFile] = useState<File>(null)
  const id = "banner"
  return (
    <>
      <ImagePicker
        onSelectedImage={setFile}
        maxByteSize={8000000}
        id={id}
        key={file?.name}>
        <div className={"wrapper"}>
          <label htmlFor={id}>
            {file ? (
              <img height={233} width={504} src={URL.createObjectURL(file)} />
            ) : (
              <div className="container">
                <img
                  className="symbol"
                  height={160}
                  width={296}
                  src="/img/banner_symbol.svg"
                  alt=""
                />
              </div>
            )}
          </label>
        </div>
      </ImagePicker>
      {file && (
        <button className="remove" onClick={() => setFile(null)}>
          削除
        </button>
      )}
      <style jsx>{`
        img {
          display: block;
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
        label {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .wrapper {
          width: 100%;
          max-width: 400px;
          position: relative;
        }
        .wrapper::before {
          content: "";
          display: block;
          padding-bottom: 53.5%;
        }
        .container {
          background-color: #282828;
          padding: 8% 15%;
        }
        .symbol {
          width: 100%;
          height: 100%;
        }
        .remove {
          border: none;
          outline: none;
          cursor: pointer;
          background-color: transparent;
          color: var(--secondary-blue-color);
        }
      `}</style>
    </>
  )
}

interface EditingLink {
  title: string
  url: string
  readonly uniqID: string
}

interface SiteLinkContentProps {
  link: EditingLink
  handleProps: DraggableProvidedDragHandleProps
  onChangeTitle: (text: string) => void
  onChangeURL: (text: string) => void
  remove: () => void
}

const SiteLinkContent = forwardRef<HTMLDivElement, SiteLinkContentProps>(
  ({ link, handleProps, onChangeTitle, onChangeURL, remove }, ref) => (
    <>
      <div ref={ref} className="content">
        <div className="handle" {...handleProps}>
          <ThreeDots />
        </div>
        <input
          className="title"
          type="text"
          placeholder={"タイトル"}
          value={link.title}
          onChange={(e) => onChangeTitle(e.target.value)}
        />
        <input
          className="url"
          type="text"
          placeholder={"https://example.com/..."}
          value={link.url}
          onChange={(e) => onChangeURL(e.target.value)}
        />
        <button title="削除" className="trash" onClick={remove}>
          <Trash />
        </button>
      </div>
      <style jsx>{`
        .content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .handle {
          cursor: grab;
          height: 22px;
        }
        .handle:active {
          cursor: grabbing;
        }
        input {
          font-size: 16px;
          line-height: 18px;
          padding: 4px 8px;
          outline: none;
          border: none;
        }
        .url {
          width: 300px;
        }
        .trash {
          outline: none;
          border: none;
          padding: 0;
          background-color: transparent;
          cursor: pointer;
        }
        img {
          display: block;
        }
        @media (prefers-color-scheme: dark) {
          input {
            background-color: #2e2f32;
            color: #f0f0f0;
          }
        }
      `}</style>
    </>
  )
)

const reorder = (list: EditingLink[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const isURL = (text: string) => {
  let url: URL
  try {
    url = new URL(text)
  } catch (_) {
    return false
  }
  return (url.protocol === "http:" || url.protocol === "https:") && !!url.host
}

const SiteLinkEditor = () => {
  const [links, setLinks] = useState<EditingLink[]>([])
  const onChangeTitle = useCallback(
    (text: string, index: number) =>
      setLinks((prev) => {
        const links = [...prev]
        links[index].title = text
        return links
      }),
    []
  )
  const onChangeURL = useCallback(
    (text: string, index: number) =>
      setLinks((prev) => {
        const links = [...prev]
        links[index].url = text
        return links
      }),
    []
  )
  const onRemove = useCallback((index: number) => {
    setLinks((prev) => {
      const links = [...prev]
      links.splice(index, 1)
      return links
    })
  }, [])
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return
      }
      setLinks(reorder(links, result.source.index, result.destination.index))
    },
    [links]
  )
  const canApendLink = useMemo(
    () =>
      links.filter((link) => !(isURL(link.url) && !!link.title)).length === 0,
    [links.map((link) => link.uniqID + link.title + link.url).join(",")]
  )
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="links">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="links">
              {links.map((link, index) => (
                <Draggable
                  key={link.uniqID}
                  draggableId={link.uniqID}
                  index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <SiteLinkContent
                        handleProps={provided.dragHandleProps}
                        onChangeTitle={(text) => onChangeTitle(text, index)}
                        onChangeURL={(text) => onChangeURL(text, index)}
                        remove={() => onRemove(index)}
                        link={link}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        className={"linkAppender"}
        disabled={!canApendLink}
        onClick={() =>
          setLinks((prev) =>
            prev.concat([
              {
                title: "",
                url: "",
                uniqID: String(
                  window.crypto.getRandomValues(new Uint32Array(10)).toString()
                ),
              },
            ])
          )
        }>
        リンクを追加
      </button>
      <style jsx>{`
        .links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .linkAppender {
          outline: none;
          border: none;
          font-size: 14px;
          font-weight: 300;
          background-color: transparent;
          color: var(--secondary-blue-color);
          cursor: pointer;
        }
        .linkAppender:active {
          color: var(--active-secondary-blue);
        }
      `}</style>
    </>
  )
}

type SectionProps = {
  title: string
  subText?: string
} & WithChildren

const Section = ({ children, title, subText }: SectionProps) => (
  <>
    <div className="container">
      <div className="header">
        <h3 className="title">{title}</h3>
        {subText && <p className="sub">{subText}</p>}
      </div>
      {children}
    </div>
    <style jsx>{`
      .container {
        padding-top: 24px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 12px;
      }
      .header {
        display: flex;
        flex-direction: row;
        gap: 12px;
      }
      .title {
        font-size: 16px;
        font-weight: 400;
      }
      .sub {
        font-size: 14px;
        line-height: 18px;
        font-weight: 300;
        align-self: flex-end;
      }
    `}</style>
  </>
)

let timeoutID: number

const Template: FC = () => {
  const channelURL = "https://raspberry-juice.com/channel/"
  const [isShowCopiedText, setIsShow] = useState(false)
  const onClickChannelURL = useCallback(
    (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
      e.currentTarget.setSelectionRange(0, channelURL.length)
      navigator.clipboard.writeText(channelURL)
      setIsShow(true)
      if (timeoutID) {
        window.clearTimeout(timeoutID)
      }
      timeoutID = window.setTimeout(() => {
        setIsShow(false)
      }, 5000)
    },
    []
  )
  return (
    <>
      <div className="container">
        <h2 className="title">チャンネル編集</h2>
        <div>
          <Section title="チャンネル名">
            <input type="text" className="name" />
          </Section>
          <Section title="チャンネル説明">
            <textarea className="description" rows={10}></textarea>
          </Section>
          <Section
            title="チャンネルURL"
            subText={isShowCopiedText && "Clipboardに保存しました"}>
            <input
              className="channelName"
              value={channelURL}
              onClick={onClickChannelURL}
              readOnly
            />
          </Section>
        </div>
        <div>
          <Section title="プロフィール画像">
            <IconPicker />
          </Section>
          <Section title="バナー画像">
            <BannerPicker />
          </Section>
          <Section title="サイトリンク">
            <SiteLinkEditor />
          </Section>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: grid;
          align-items: flex-start;
          padding: 32px 60px;
          column-gap: 40px;
          grid-template-columns: 60% 1fr;
          max-width: 1100px;
        }
        .container div {
          align-self: flex-start;
        }
        .title {
          font-size: 24px;
          font-weight: 500;
          grid-column: 1/3;
        }
        input,
        textarea {
          outline: none;
          border: none;
          font-family: "Noto Sans JP";
          background-color: white;
          color: #202020;
          padding: 4px 8px;
          width: 100%;
          box-sizing: border-box;
        }
        .name {
          font-size: 24px;
        }
        .description {
          resize: vertical;
          font-size: 18px;
        }
        .channelName {
          font-size: 16px;
          font-weight: 400;
          cursor: pointer;
        }

        @media (max-width: 750px) {
          .container {
            grid-template-columns: 1fr;
            align-items: flex-start;
            padding: 12px 20px;
          }
          .title {
            grid-column: 1/2;
          }
        }
        @media (prefers-color-scheme: dark) {
          input,
          textarea {
            background-color: #2e2f32;
            color: #f0f0f0;
          }
        }
      `}</style>
    </>
  )
}

export default Template
