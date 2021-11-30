import React, {
  FC,
  forwardRef,
  useCallback,
  useEffect,
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
import app from "~/modules/firebase"
import { Profile, ResizableImage } from "~/modules/entity"
import FilePicker from "~/components/filepicker"
import upload from "~/modules/imageupload"
import { useRecoilValue } from "recoil"
import auth from "~/stores/auth"
import firebase from "firebase/app"
import "firebase/firestore"
import { toClassName } from "~/modules/utils/css"

type ProfileType = Profile<firebase.firestore.Timestamp>

const acceptImage = (...types: string[]) =>
  types.map((type) => "image/" + type).join(",")

interface IconPickerProps {
  theme?: number
}

const IconPicker: FC<IconPickerProps> = ({ theme }) => {
  const [file, setFile] = useState<File>(null)
  const uid = useRecoilValue(auth.selector.uid)
  const id = "icon"
  const icon = useMemo(
    () =>
      file
        ? URL.createObjectURL(file)
        : "/api/icon" + (theme ? `?color=${theme}` : ""),
    [theme, file]
  )
  useEffect(() => {
    if (!(file && uid)) return
    const path = "profile/icon"
    upload(path, file, uid).then((id) => {
      console.log(id)
    })
    // .then(({ id }) => {
    //   setFile(null)
    //   setURL(`https://picture.raspberry-juice.com/profile/${uid}/icon/${id}`)
    // })
  }, [file])
  return (
    <>
      <FilePicker
        onSelectedFile={setFile}
        accept={acceptImage("jpeg", "png", "webp")}
        maxByteSize={6000000}
        id={id}
        key={file?.name}>
        <label className="container" htmlFor={id}>
          <div className="inner">
            <div className="image">
              <img width={114} height={114} src={icon} />
            </div>
          </div>
        </label>
      </FilePicker>
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

const BannerPicker: React.FC<{
  currentID?: string
  currentImage: ResizableImage
}> = (props) => {
  const [file, setFile] = useState<File>(null)
  const id = "banner"
  const uid = useRecoilValue(auth.selector.uid)
  const [imageID, setImageID] = useState(props.currentID)
  const [currentURL, setCurrentURL] = useState<ResizableImage>(
    props.currentImage
  )
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<Error>()
  const resetUpdating = useCallback(() => {
    setIsUploading(false)
    setFile(null)
  }, [])
  useEffect(() => {
    if (!(file && uid)) return
    setIsUploading(true)
    const path = "profile/banner"
    upload(path, file, uid)
      .then(({ id }) => {
        setImageID(id)
      })
      .catch((e) => {
        setError(e)
        resetUpdating()
      })
  }, [file])
  useEffect(() => {
    if (!imageID) return
    app
      .firestore()
      .collection("images")
      .doc(imageID)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.exists) {
            setCurrentURL(snapshot.data() as ResizableImage)
            resetUpdating()
          }
        },
        (e) => {
          setError(e)
          resetUpdating()
        }
      )
  }, [imageID])
  return (
    <>
      <FilePicker
        onSelectedFile={setFile}
        accept={acceptImage("jpeg", "png", "webp")}
        maxByteSize={8000000}
        disabled={isUploading}
        id={id}
        key={file?.name}>
        <div className={"wrapper"}>
          <label className={toClassName({ effected: true })} htmlFor={id}>
            {file ? (
              <img height={233} width={504} src={URL.createObjectURL(file)} />
            ) : currentURL ? (
              <img height={233} width={504} src={currentURL.medium} />
            ) : (
              <div className="container">
                <img
                  className="symbol"
                  height={160}
                  width={296}
                  src={"/img/banner_symbol.svg"}
                  alt=""
                />
              </div>
            )}
          </label>
        </div>
      </FilePicker>
      {(file || (imageID && !isUploading)) && (
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
          overflow: hidden;
        }
        .wrapper::before {
          content: "";
          display: block;
          padding-bottom: 53.5%;
        }
        .effected {
          filter: blur(5px);
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

interface Props {
  id: string
}

const Template: FC<Props> = ({ id }) => {
  const channelURL = "https://raspberry-juice.com/creator/" + id
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
  const [profile, setProfile] = useState<ProfileType>()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  useEffect(() => {
    app
      .firestore()
      .collection("creators")
      .doc(id)
      .get()
      .then((snapshot) => {
        setProfile(snapshot.data() as ProfileType)
      })
  }, [id])
  useEffect(() => {
    setName(profile?.name)
    setDescription(profile?.description)
  }, [profile])
  if (!profile) {
    return <></>
  }
  return (
    <>
      <div className="container">
        <h2 className="title">チャンネル編集</h2>
        <div>
          <Section title="チャンネル名">
            <input
              type="text"
              className="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Section>
          <Section title="チャンネル説明">
            <textarea
              className="description"
              rows={10}
              onChange={(e) => setDescription(e.target.value)}
              value={description}></textarea>
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
            <IconPicker theme={profile.theme} />
          </Section>
          <Section title="バナー画像">
            <BannerPicker
              currentID={profile.banner.meta.id}
              currentImage={profile.banner}
            />
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
          font-size: 21px;
        }
        .description {
          resize: vertical;
          font-size: 16px;
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
