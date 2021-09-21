import { FC } from "react"
import Player from "~/components/player"
import { SerializableVideo } from "~/modules/entity"

interface Props {
  video: SerializableVideo
}

const Index: FC<Props> = ({ video }) => {
  return (
    <>
      <div className={"container"}>
        <div className={"primary"}>
          <div className={"playerContainer"}>
            <Player src={video.url} poster={video.poster} />
          </div>
          <h2 className="title">{video.title}</h2>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          padding: 40px 20px 0;
          max-width: 900px;
          display: grid;
        }
        .title {
          font-size: 20px;
          font-weight: medium;
          padding-top: 20px;
        }
        @media screen and (max-width: 899px) {
          .container {
            padding: 12px 20px 0;
          }
          .title {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  )
}

export default Index
