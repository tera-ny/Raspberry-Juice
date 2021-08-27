import { FC } from "react"
import { Video } from "~/modules/entity"
import Link from "next/link"

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

interface Props {
  video: Video
}

const Content: FC<Props> = (props) => (
  <>
    <Link href={{ pathname: "/contents/video", query: { id: props.video.id } }}>
      <a>
        <div className="wrapper">
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
              <p className="title">{props.video.title}</p>
              <p className="date">2021/09/01</p>
            </div>
          </div>
        </div>
      </a>
    </Link>
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

export default Content
