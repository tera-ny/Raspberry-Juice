import { FC } from "react"
import Link from "next/link"

const UploadButton: FC = () => (
  <>
    <Link href={{ pathname: "/", query: { m: "upload" } }}>
      <a className="uploadbutton">
        アップロード
        <div className="uploadicon">
          <img
            alt="upload icon"
            width={20}
            height={14}
            src="/img/upload_icon.svg"
          />
        </div>
      </a>
    </Link>
    <style jsx>
      {`
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
          background-color: #1d72af;
          cursor: pointer;
          display: flex;
          align-items: center;
          line-height: 18px;
        }
        .uploadbutton:hover {
          background-color: #1b7bc0;
        }
        .uploadbutton:active {
          background-color: #2289d3;
        }
        .uploadicon {
          padding-left: 12px;
        }
      `}
    </style>
  </>
)

export default UploadButton
