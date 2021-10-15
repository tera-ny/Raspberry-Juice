import { FC } from "react"
import Link from "next/link"

const EditProfileButton: FC = () => (
  <>
    <Link href={{ pathname: "/" }}>
      <a className="editbutton">
        プロフィール編集
        <div className="editicon">
          <img
            width={16}
            height={15}
            alt="memo icon"
            className="editicon"
            src="/img/memo_icon.svg"
          />
        </div>
      </a>
    </Link>
    <style jsx>
      {`
        .editbutton {
          padding: 10px 16px 12px;
          outline: none;
          border: none;
          border-radius: 4px;
          font-family: "Noto Sans JP";
          font-weight: 500;
          text-align: center;
          font-size: 16px;
          color: white;
          background-color: #e2495d;
          cursor: pointer;
          display: flex;
          align-items: center;
          line-height: 18px;
        }
        .editicon {
          padding-left: 10px;
        }
      `}
    </style>
  </>
)

export default EditProfileButton
