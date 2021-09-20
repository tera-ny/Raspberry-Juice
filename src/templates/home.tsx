import { FC, useContext, useState } from "react"
import { SerializableVideo } from "~/modules/entity"
import Content from "~/components/videocontent"
import { Modal } from "~/components/modal"
import Link from "next/link"
import UploadContent from "~/components/uploadcontent"
import { useRouter } from "next/dist/client/router"

export type Props = {
  videos: SerializableVideo[]
  upload: boolean
}

const Template: FC<Props> = (props) => {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  return (
    <>
      <div className="container">
        <div className="sectiontitlewrapper">
          <h2 className="sectiontitle">Home</h2>
          <hr className="separator" />
        </div>
        <div className="contents">
          {props.videos.map((video, index) => (
            <Content video={video} key={index} />
          ))}
        </div>
        <Link href={{ pathname: "/", query: { upload: true } }}>
          <a>link</a>
        </Link>
      </div>
      <Modal
        visible={props.upload}
        onClickBackground={() => {
          if (!isUploading) {
            router.push({ pathname: "/" })
          }
        }}>
        {props.upload && <UploadContent onChangeIsUploading={setIsUploading} />}
      </Modal>
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
