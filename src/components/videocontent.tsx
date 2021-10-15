import { FC } from "react"
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
        src="/img/logo_white.svg"
        alt="logo"
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
          user-select: none;
          pointer-events: none;
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
  const router = useRouter()
  return (
    <>
      <article
        onClick={() => {
          router.push(`/contents/${props.video.id}`)
        }}
        className="article">
        <div className="content">
          <div className="imagewrapper">
            {props.video.poster ? (
              <img
                className="image"
                alt="poster"
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
            <h3 className="title">{props.video.title ?? "No title"}</h3>
            <p className="date">
              {millisToFormatedDate(props.video.createdAtMillis)}
            </p>
          </div>
        </div>
      </article>
      <style jsx>
        {`
          .article {
            cursor: pointer;
          }
          .article:hover {
            box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
          }
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
            padding-top: calc(9 / 16 * 100%); /* 高さを幅の75%に固定 */
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
            padding: 4px 8px;
          }
          .title {
            font-size: 14px;
            line-height: 18px;
            color: #4a4a4a;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 400;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            -webkit-box-orient: vertical;
            max-height: 36px;
          }
          .date {
            width: 100%;
            text-align: end;
            font-size: 12px;
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
