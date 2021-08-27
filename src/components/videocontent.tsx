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
        @media screen and (prefers-color-scheme: dark) {
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
        <div className="content">
          <div className="imagewrapper">
            {props.video.poster ? (
              <img className="image" src={props.video.poster} />
            ) : (
              <Placeholder />
            )}
          </div>
          <p className="title">{props.video.title}</p>
          <p className="date">2021/09/01</p>
        </div>
      </a>
    </Link>
    <style jsx>
      {`
        .content {
          width: 280px;
          height: 208px;
          background-color: white;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .imagewrapper {
          height: 138px;
        }
        .image {
          height: 100%;
          width: 100%;
        }
        .metadata {
          position: relative;
          height: 50px;
          padding: 4px;
        }
        .title {
          font-size: 12px;
          color: #404040;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* number of lines to show */
          -webkit-box-orient: vertical;
          margin: 8px;
        }
        .date {
          position: absolute;
          bottom: 8px;
          right: 8px;
          font-size: 8px;
          color: #ababab;
        }
        a {
          text-decoration: none;
        }
      `}
    </style>
  </>
)

export default Content
