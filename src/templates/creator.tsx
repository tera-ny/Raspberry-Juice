import { FC, useCallback, useEffect, useMemo, useState } from "react"
import { SerializableProfile, SerializableVideo } from "~/modules/entity"
import Content from "~/components/videocontent"
import { Modal } from "~/components/modal"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import ReactLinkify from "react-linkify"
import UploadButton from "~/components/button/upload"
import EditProfileButton from "~/components/button/editprofile"
import { toClassName } from "~/modules/utils/css"
import { useAuthUser } from "next-firebase-auth"

interface ProfileProps {
  profile: SerializableProfile
}

const ProfileTemplate: FC<ProfileProps> = ({ profile }) => {
  const user = useAuthUser()
  const router = useRouter()
  const isOwner = useMemo(() => user.id === profile.id, [user.id, profile.id])
  return (
    <>
      <div className="container">
        <div
          className={toClassName({
            background: true,
            effected: !!profile.background,
          })}>
          {profile.background && (
            <img src={profile.background} width="100%" height="100%" alt="" />
          )}
        </div>
        <div className="primary">
          <img
            className="icon"
            height="200"
            src={profile.icon ?? `/api/icon?color=${profile.theme}`}
            alt="icon"
          />
          <div className="namewrapper">
            <h2 className="name">{profile.name}</h2>
          </div>
          {!!profile.links.length && (
            <div className="links">
              {profile.links.map((link, index) => (
                <a
                  className="link"
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer">
                  <p>{link.text}</p>
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="secondary">
          <div className="meta">
            <div className="inner">
              <h4>biography</h4>
              <div className="bio description">
                <ReactLinkify
                  componentDecorator={(href, text, key) => (
                    <a
                      style={{ color: "inherit" }}
                      href={href}
                      key={key}
                      target="_blank"
                      rel="noopener noreferrer">
                      {text}
                    </a>
                  )}>
                  {profile.description}
                </ReactLinkify>
                <br />
                <br />
              </div>
            </div>
            <p className="createdAt bio">2021/09/30 に登録</p>
          </div>
          <div className="bottomcontents">
            <p className="bio">2021/09/30 に登録</p>
            <div className="buttons">
              <UploadButton
                href={{
                  pathname: router.asPath,
                  query: { m: true },
                }}
              />
              <EditProfileButton />
            </div>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            position: relative;
            display: grid;
            box-sizing: border-box;
            align-items: center;
          }
          .background {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }
          .background img {
            object-fit: cover;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }
          .background:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
          }
          .container div:not(.background) {
            position: relative;
          }
          .primary {
            display: grid;
            align-items: center;
            justify-content: flex-start;
          }
          .namewrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .name {
            font-size: 68px;
            color: white;
            background-color: black;
            padding: 2px 12px;
          }
          .links {
            display: flex;
            column-gap: 20px;
            row-gap: 12px;
            padding-top: 32px;
            flex-wrap: wrap;
          }
          .link {
            padding: 4px 8px;
            font-size: 16px;
            font-weight: 400;
            text-decoration: underline;
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            cursor: pointer;
            color: white;
            background-color: rgba(0, 0, 0, 0.56);
            white-space: nowrap;
          }
          .link:hover {
            background-color: rgba(40, 40, 40, 0.56);
          }
          .secondary {
            display: grid;
            flex-direction: column;
            row-gap: 20px;
            justify-content: stretch;
            align-items: flex-start;
            box-sizing: border-box;
            grid-template-rows: 1fr auto;
          }
          .meta {
            box-sizing: border-box;
            width: 100%;
          }
          .inner {
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
            height: calc(100% - 20px);
          }
          .bio {
            box-sizing: border-box;
            white-space: pre-wrap;
            font-weight: 400;
            font-size: 14px;
            color: #080808;
            line-height: 20px;
            word-break: break-all;
            letter-spacing: 2px;
          }
          .description {
            padding-top: 8px;
          }
          .morebutton {
            outline: none;
            border: none;
            background-color: transparent;
            text-decoration: underline;
            font-family: "Noto Sans JP";
            font-weight: 300;
            font-size: 14px;
            cursor: pointer;
            color: black;
            margin-top: 10px;
          }
          .morebutton:active {
            color: #252525;
          }
          .bottomcontents {
            box-sizing: border-box;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .buttons {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }

          @media (max-width: 500px) {
            .container {
              grid-template-rows: max(calc(100vw * 0.72), 250px) auto;
            }
            .background {
              height: max(calc(100vw * 0.72), 250px);
            }
            .name {
              font-size: 24px;
            }
            .icon {
              width: max(calc(100vw * 0.16), 40px);
              height: max(calc(100vw * 0.16), 40px);
            }
          }

          @media (min-width: 501px) and (max-width: 1200px) {
            .container {
              grid-template-rows: 360px auto;
            }
            .background {
              height: 360px;
            }
            .name {
              font-size: 32px;
            }
            .icon {
              width: 80px;
              height: 80px;
            }
          }

          @media (max-width: 1000px) {
            .links {
              overflow-x: scroll;
              flex-wrap: nowrap;
              height: 52px;
              align-items: flex-start;
            }
            .secondary {
              padding: 42px 20px 20px;
            }
          }

          @media (max-width: 1200px) {
            .primary {
              padding: 20px;
              column-gap: 20px;
            }
            .secondary {
              width: 100%;
            }
          }

          @media (min-width: 1001px) {
            .icon {
              width: min(calc(100vw * 0.1), 180px);
              height: min(calc(100vw * 0.1), 180px);
            }
            .name {
              font-size: 38px;
            }
          }
          @media (min-width: 1001px) and (max-width: 1200px) {
            .meta {
              height: 260px;
            }
          }
          @media (min-width: 1001px) and (max-width: 1600px) {
            .container {
              grid-template-columns: min(53%, 700px) max(min(43%, 600px), 420px);
              column-gap: 40px;
              padding: 0 20px;
            }
            .meta {
              padding: 20px 0;
            }
            h4,
            .bio {
              padding: 0 20px;
            }
            .secondary {
              padding: 20px;
            }
          }
          @media (min-width: 1201px) and (max-width: 1600px) {
            .container {
              grid-template-columns: min(53%, 700px) min(43%, 600px);
              justify-content: center;
              column-gap: 40px;
              padding: 0 20px;
            }
            .primary {
              column-gap: 32px;
            }
            .name {
              font-size: 48px;
              line-height: 64px;
            }
            .meta {
              height: 350px;
            }
            .secondary {
              max-width: 600px;
            }
          }
          @media (max-width: 1600px) {
            .icon {
              grid-row: 1/2;
            }
            .namewrapper {
              grid-row: 1/2;
            }
            .links {
              grid-row: 2/3;
              grid-column: 1/3;
            }
            .bottomcontents {
              display: ${isOwner ? "flex" : "none"};
            }
          }
          @media (min-width: 1601px) {
            .container {
              height: 400px;
            }
            .icon {
              grid-row: 1 / ${!!profile.links.length ? "3" : "2"};
            }
            .namewrapper {
              grid-row: 1/2;
            }
            .links {
              grid-row: 2/3;
            }
            .container {
              grid-template-columns: 1fr 600px;
              padding: 0;
            }
            .background {
              width: calc(100% - 600px);
            }
            .primary {
              padding-left: 15%;
              column-gap: 52px;
              justify-content: flex-start;
            }
            .createdAt {
              display: none;
            }
            .secondary {
              width: 600px;
              height: 100%;
              padding: 20px;
            }
            .bottomcontents {
              display: flex;
            }
            .name {
              font-size: 52px;
              line-height: 74px;
            }
          }
          @media (prefers-color-scheme: light) {
            .background {
              background-color: #222222;
            }
            .bio {
              color: #080808;
            }
            .morebutton {
              color: black;
            }
            .morebutton:active {
              color: #252525;
            }
          }
          @media (prefers-color-scheme: dark) {
            .background {
              background-color: #222222;
            }
            .bio {
              color: white;
            }
            .morebutton {
              color: white;
            }
            .morebutton:active {
              color: #f8f8f8;
            }
          }
          @media (prefers-color-scheme: light) {
            .background.effected:after {
              background-image: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0),
                rgba(248, 248, 248, 1)
              );
            }
          }
          @media (prefers-color-scheme: dark) {
            .background.effected:after {
              background-image: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0),
                rgba(30, 32, 38, 1)
              );
            }
          }

          @media (prefers-color-scheme: light) and (min-width: 1001px) and (max-width: 1600px) {
            .meta {
              background-color: white;
            }
          }
          @media (prefers-color-scheme: dark) and (min-width: 1001px) and (max-width: 1600px) {
            .meta {
              background-color: #1e2026;
            }
          }
        `}
      </style>
    </>
  )
}

const UploadContent = dynamic(import("~/components/uploadcontent"))

export type Props = {
  profile: SerializableProfile
  contents: SerializableVideo[]
  modal: boolean
  edit?: string
}

const Template: FC<Props> = (props) => {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const previous = useCallback(() => {
    if (!isUploading) {
      router.replace({
        pathname: router.pathname,
        query: { creatorID: router.query.creatorID },
      })
    }
  }, [isUploading])
  return (
    <>
      <ProfileTemplate profile={props.profile} />
      <div className="container">
        <div className="sectiontitlewrapper">
          <h2 className="sectiontitle">Contents</h2>
          <hr className="separator" />
        </div>
        <div className="contents">
          {props.contents.map((video, index) => (
            <Content video={video} key={index} />
          ))}
        </div>
      </div>
      <Modal visible={props.modal} onClickBackground={previous}>
        {props.modal && (
          <>{<UploadContent onChangeIsUploading={setIsUploading} />}</>
        )}
      </Modal>
      <style jsx>{`
        .container {
          padding: 20px 52px;
          position: relative;
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
          max-width: 120px;
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
        @media (min-width: 831px) {
          .container {
            padding-top: 40px;
          }
          .contents {
            padding-top: 32px;
          }
        }
      `}</style>
    </>
  )
}

export default Template
