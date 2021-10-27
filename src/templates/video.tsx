import { FC, useCallback, useEffect, useRef, useState } from "react"
import { SerializableVideo } from "~/modules/entity"
import dynamic from "next/dynamic"
import auth from "~/stores/auth"
import dayjs from "dayjs"
import { useRecoilValue } from "recoil"
import Link from "next/link"
import css from "styled-jsx/css"
import ReactLinkify from "react-linkify"

interface Props {
  video: SerializableVideo
}

const morebuttonStyle = css`
  .morebutton {
    outline: none;
    border: none;
    background-color: transparent;
    text-decoration: underline;
    font-family: "Noto Sans JP";
    font-weight: 300;
    font-size: 14px;
    cursor: pointer;
    color: black;
    margin-top: 10px;
  }
  .morebutton:active {
    color: #252525;
  }
  @media (prefers-color-scheme: dark) {
    .morebutton {
      color: white;
    }
    .morebutton:active {
      color: #e7e7e7;
    }
  }
`

const Meta = (
  video: Pick<
    SerializableVideo,
    "owner" | "createdAtMillis" | "description" | "title" | "id"
  >
) => {
  const uid = useRecoilValue(auth.selector.uid)
  const description = useRef<HTMLParagraphElement>()
  const expander = useRef<HTMLDivElement>()
  const [isShowMore, setIsShowMore] = useState(false)
  const [shouldMore, setShouldMore] = useState(false)
  const toggleShowMore = useCallback(() => {
    setIsShowMore((prev) => !prev)
  }, [])
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setShouldMore((description.current.clientHeight ?? 0) > 120)
    })
    observer.observe(description.current)
    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <>
      <div>
        <div className="titlewrapper">
          <h2 className="title">{video.title}</h2>
          {video.owner && video.owner == uid && (
            <Link
              href={{
                pathname: "/contents/" + video.id,
                query: { edit: true },
              }}>
              <a className="editLink">
                <div className="editbutton">
                  編集する
                  <img
                    height="15"
                    width="16"
                    className="pen"
                    src="/img/pen_icon_white.svg"
                  />
                </div>
              </a>
            </Link>
          )}
        </div>
        <p className="uploadedAt">
          {dayjs(video.createdAtMillis).format("YYYY/MM/DD")}
        </p>
        <hr />
        <div ref={expander} className="expander">
          <ReactLinkify
            componentDecorator={(href, text, key) => (
              <a
                className="link"
                href={href}
                key={key}
                target="_blank"
                rel="noopener noreferrer">
                {text}
              </a>
            )}>
            <p ref={description} className="description">
              {video.description}
            </p>
          </ReactLinkify>
        </div>
        {shouldMore && (
          <button className="morebutton" onClick={toggleShowMore}>
            {isShowMore ? "一部のみ表示" : "もっと見る"}
          </button>
        )}
      </div>
      <style jsx>{`
        .title {
          font-size: 20px;
          font-weight: medium;
        }
        .titlewrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .editLink {
          text-decoration: none;
        }
        .editbutton {
          padding: 6px 12px;
          background-color: var(--primary-pink-color)
          color: white;
          display: flex;
          align-items: center;
          font-size: 14px;
          line-height: 20px;
          width: 100px;
          box-sizing: border-box;
        }
        .pen {
          padding-left: 4px;
        }
        .uploadedAt {
          padding-top: 12px;
        }
        hr {
          margin: 12px 0;
        }
        .expander {
          padding: 8px 10px 0;
          height: ${shouldMore ? (isShowMore ? "auto" : "100px") : "120px"};
          overflow-y: hidden;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          white-space: pre-wrap;
        }
        .link {
          color: black;
          text-decoration: underline;
        }
        @media (prefers-color-scheme: dark) {
          .link {
            color: white;
          }
        }
      `}</style>
      <style jsx>{morebuttonStyle}</style>
    </>
  )
}

const Profile = () => {
  const bio = useRef<HTMLParagraphElement>()
  const expander = useRef<HTMLDivElement>()
  const [isShowMore, setIsShowMore] = useState(false)
  const [shouldMore, setShouldMore] = useState(false)
  const description = useState(
    `Virtual hip hop girls duo "KMNZ"(KEMONOZ) Liz official YouTube Channel.\n\nバーチャルHIP-HOPガールズデュオ、KMNZ（ケモノズ）リズの公式YouTubeチャンネル。LIZ RADIOのアーカイブや、リズが大好きなボカロ・アニソンのカバーを中心に更新。\n\n🐱KMNZ on Apple Music\nhttps://itunes.apple.com/jp/artist/kmnz/1416494540\n\n🐱KMNZ on Spotify\nhttps://open.spotify.com/artist/4uWpa0r7BZUXJ1ip2LJysz\n\n🐱KMNSUPPLY\nKMNZ official goods store\nhttps://kmnsupply.stores.jp/\n\n🐱KMNZ OFFICIAL SITE\nhttps://kmnz.jp\n\n🐱KMNSTREET OFFICIAL ACCOUNT\nhttps://twitter.com/KMNSTREET`
  )
  const toggleShowMore = useCallback(() => {
    setIsShowMore((prev) => !prev)
  }, [])
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setShouldMore((bio.current.clientHeight ?? 0) > 120)
    })
    observer.observe(bio.current)
    return () => {
      observer.disconnect()
    }
  }, [])
  return (
    <>
      <div className="container">
        <div className="primary">
          <img
            className="icon"
            width={32}
            height={32}
            src="/img/logo.svg"
            alt=""
          />
          <p className="name">terany</p>
        </div>
        <div ref={expander} className="expander">
          <ReactLinkify
            componentDecorator={(href, text, key) => (
              <a
                className="link"
                href={href}
                key={key}
                target="_blank"
                rel="noopener noreferrer">
                {text}
              </a>
            )}>
            <p ref={bio} className="bio">
              {description}
            </p>
          </ReactLinkify>
        </div>
        {shouldMore && (
          <button className={"morebutton"} onClick={toggleShowMore}>
            {isShowMore ? "一部のみ表示" : "もっと見る"}
          </button>
        )}
      </div>
      <style jsx>{`
        .container {
          padding: 12px;
          background-color: white;
        }
        .primary {
          display: flex;
          align-items: center;
        }
        .icon {
          border-radius: 50%;
          background-color: #f8f8f8;
        }
        .name {
          font-size: 16px;
          font-weight: 500;
          color: #404040;
          padding-left: 12px;
        }
        .expander {
          padding-top: 12px;
          height: ${shouldMore ? (isShowMore ? "auto" : "100px") : "120px"};
          overflow-y: hidden;
        }
        .bio {
          white-space: pre-wrap;
          font-weight: 300;
          font-size: 14px;
          color: #5f5f5f;
          line-height: 20px;
          word-break: break-all;
        }
        .link {
          color: black;
          text-decoration: underline;
        }

        @media (prefers-color-scheme: dark) {
          .name {
            color: white;
          }
          .bio {
            color: #d8d8d8;
          }
          .container {
            background-color: #25282e;
          }
          .link {
            color: white;
          }
        }
      `}</style>
      <style jsx>{morebuttonStyle}</style>
    </>
  )
}

const DynamicPlayer = dynamic(import("~/components/player"), {
  loading: () => <video></video>,
})

const Index: FC<Props> = ({ video }) => {
  return (
    <>
      <div className="container">
        <div className="playerContainer">
          <DynamicPlayer
            aspectRatio={16 / 9}
            src={video.url}
            poster={video.poster}
          />
        </div>
        <div>
          <Meta {...video} />
        </div>
        <div>
          <Profile />
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto 100px;
          padding: 40px 20px 0;
          max-width: 1200px;
          display: grid;
          row-gap: 24px;
          column-gap: 40px;
          grid-template-columns: 1fr min(45%, 400px);
        }
        .playerContainer {
          grid-column: 1 / 3;
        }
        @media screen and (max-width: 899px) {
          .container {
            padding: 12px 20px 0;
          }
        }
        @media (max-width: 700px) {
          .container {
            grid-template-columns: 1fr;
          }
          .playerContainer {
            grid-column: 1 / 2;
          }
        }
      `}</style>
    </>
  )
}

export default Index
