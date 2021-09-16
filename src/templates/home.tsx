import { FC, useContext } from "react"
import { SerializableVideo } from "~/modules/entity"
import Content from "~/components/videocontent"
import { ModalContext } from "~/components/modal"

interface Props {
  videos: SerializableVideo[]
}

const Template: FC<Props> = ({ videos }) => {
  const context = useContext(ModalContext)
  return (
    <>
      <div className="container">
        <div className="sectiontitlewrapper">
          <h2 className="sectiontitle">Home</h2>
          <hr className="separator" />
        </div>
        <div className="contents">
          {videos.map((video, index) => (
            <Content video={video} key={index} />
          ))}
        </div>
        <button
          onClick={() => {
            context.updateContent("UP_LOAD")
          }}>
          content='UP_LOAD'
        </button>
      </div>
      <style jsx>{`
        .container {
          padding: 20px 52px;
        }
        .sectiontitlewrapper {
          padding-bottom: 20px;
        }
        .sectiontitle {
          font-weight: medium;
          font-size: 24px;
          color: #404040;
        }
        .separator {
          margin: 0;
          max-width: 100px;
        }
        .contents {
          display: grid;
          grid-template-columns: repeat(auto-fill, 280px);
          column-gap: 32px;
          row-gap: 24px;
        }
        @media (prefers-color-scheme: dark) {
          .sectiontitle {
            color: white;
          }
        }
        @media (max-width: 450px) {
          .container {
            padding: 16px 20px;
          }
          .contents {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}

export default Template
