import { FC, useState } from "react"
import { SerializableVideo } from "~/modules/entity"
import Content from "~/components/videocontent"
import { Modal } from "~/components/modal"
import Link from "next/link"
import UploadContent from "~/components/uploadcontent"
import { useRouter } from "next/dist/client/router"
import EditContent from "~/components/editcontent"

export type Props = {
  contents: SerializableVideo[]
  modal: boolean
  edit?: string
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
          {props.contents.map((video, index) => (
            <Content video={video} key={index} />
          ))}
        </div>
        <div className="upload">
          <Link href={{ pathname: "/", query: { m: true } }}>
            <button className="uploadbutton">
              アップロード
              <img
                className="uploadicon"
                width={20}
                height={14}
                src="/img/upload_icon.svg"
              />
            </button>
          </Link>
        </div>
      </div>
      <Modal
        visible={props.modal}
        onClickBackground={() => {
          if (!isUploading) {
            router.push({ pathname: "/" })
          }
        }}>
        {props.modal && (
          <>
            {props.edit ? (
              <EditContent
                id={props.edit}
                onChangeIsUploading={setIsUploading}
              />
            ) : (
              <UploadContent onChangeIsUploading={setIsUploading} />
            )}
          </>
        )}
      </Modal>
      <style jsx>{`
        .container {
          padding: 20px 52px;
          position: relative;
        }
        .upload {
          position: fixed;
          bottom: 54px;
          right: 60px;
        }
        .uploadbutton {
          padding: 10px 16px 12px;
          outline: none;
          border: none;
          border-radius: 4px;
          font-family: "Noto Sans JP";
          font-weight: 500;
          text-align: center;
          font-size: 16px;
          color: white;
          background-color: #d0693e;
          cursor: pointer;
          display: flex;
          align-items: center;
          line-height: 18px;
        }
        .uploadbutton:hover {
          background-color: #e36e3d;
        }
        .uploadbutton:active {
          background-color: #d3754d;
        }
        .uploadicon {
          padding-left: 12px;
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
          grid-template-columns: repeat(auto-fill, 240px);
          justify-content: center;
          align-items: flex-start;
          column-gap: 32px;
          row-gap: 24px;
        }
        @media (prefers-color-scheme: dark) {
          .sectiontitle {
            color: white;
          }
        }
        @media (max-width: 830px) {
          .container {
            padding: 20px;
          }
          .upload {
            bottom: 20px;
            right: 20px;
          }
          .contents {
            column-gap: 20px;
            row-gap: 16px;
          }
        }
        @media (max-width: 500px) {
          .container {
            padding: 16px 20px;
          }
          .upload {
            bottom: 16px;
            right: 20px;
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
