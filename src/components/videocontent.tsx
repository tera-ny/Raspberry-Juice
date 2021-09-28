import { FC, useState } from "react"
import { SerializableVideo } from "~/modules/entity"
import dayjs from "dayjs"
import { useRouter } from "next/router"

const Placeholder: FC = () => (
  <>
    <div className="background">
      <img
        className="img"
        width={66}
        height={42}
        src="/img/video_tape_light.svg"
        alt=""
      />
      <p className="text">no image</p>
    </div>
    <style jsx>
      {`
        .background {
          background-color: #b8b8b8;
          display: grid;
          row-gap: 8px;
          justify-content: center;
          padding: 20px;
          height: 100%;
          box-sizing: border-box;
        }
        .img {
          align-self: flex-end;
        }
        .text {
          color: white;
          font-size: 12px;
          font-weight: normal;
          text-align: center;
          align-self: flex-start;
        }
        @media (prefers-color-scheme: dark) {
          .background {
            background-color: #32363e;
          }
        }
      `}
    </style>
  </>
)

const millisToFormatedDate = (millis: number) =>
  dayjs(millis).format("YYYY/MM/DD")

interface Props {
  video: SerializableVideo
}

const Content: FC<Props> = (props) => {
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()
  return (
    <>
      <article
        onClick={() => {
          router.push(`/contents/${props.video.id}`)
        }}
        className="wrapper">
        <div className="content">
          <div className="imagewrapper">
            {props.video.poster ? (
              <img
                className="image"
                src={props.video.poster}
                width={100}
                height={56}
              />
            ) : (
              <div className="image">
                <Placeholder />
              </div>
            )}
          </div>
          <div className="metadata">
            <div className="primary">
              <p className="title">{props.video.title ?? "No title"}</p>
              <div className="menuWrapper">
                {showMenu && (
                  <div className="menu">
                    <p
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowMenu(false)
                        router.replace({
                          pathname: "/",
                          query: { m: true, id: props.video.id },
                        })
                      }}>
                      編集する
                    </p>
                  </div>
                )}
                <button
                  className="toggleButton"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowMenu((prev) => !prev)
                  }}>
                  <picture>
                    <source
                      srcSet="/img/three_dots_dark.svg"
                      media="(prefers-color-scheme: dark)"
                    />
                    <img
                      className="menuIcon"
                      width="16"
                      height="4"
                      src="/img/three_dots_light.svg"
                    />
                  </picture>
                </button>
              </div>
            </div>
            <p className="date">
              {millisToFormatedDate(props.video.createdAtMillis)}
            </p>
          </div>
        </div>
      </article>
      <style jsx>
        {`
          .content {
            background-color: white;
            display: flex;
            flex-direction: column;
          }
          .imagewrapper {
            position: relative;
            width: 100%;
          }
          .imagewrapper:before {
            content: "";
            display: block;
            padding-top: 56%; /* 高さを幅の75%に固定 */
          }
          .image {
            height: 100%;
            width: 100%;
            position: absolute;
            background-color: #b8b8b8;
            top: 0;
            left: 0;
          }
          .metadata {
            position: relative;
            padding: 8px;
          }
          .primary {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .menuWrapper {
            position: relative;
          }
          .menu {
            position: absolute;
            background-color: #f8f8f8;
            right: 0;
            bottom: calc(100% + 10px);
            width: 120px;
            padding: 4px 8px;
            border-radius: 4px;
            box-shadow: 0 0 2px black;
          }
          .menu > p {
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
          }
          .toggleButton {
            border: none;
            outline: none;
            background-color: transparent;
            cursor: pointer;
            padding: 0;
          }
          .menuIcon {
            height: 16px;
            padding: 4px;
          }
          .title {
            font-size: 12px;
            color: #404040;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            -webkit-box-orient: vertical;
            height: 34px;
          }
          .date {
            width: 100%;
            text-align: end;
            font-size: 8px;
            padding-top: 8px;
            color: #ababab;
          }
          a {
            text-decoration: none;
          }
          @media (prefers-color-scheme: dark) {
            .content {
              background-color: #25282e;
            }
            .title {
              color: white;
            }
            .menu {
              background-color: #25282e;
              box-shadow: 0 0 2px white;
            }
            .date {
              color: #ebebeb;
            }
            .image {
              background-color: #32363e;
            }
          }
          @media (max-width: 450px) {
            .content {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}

export default Content
