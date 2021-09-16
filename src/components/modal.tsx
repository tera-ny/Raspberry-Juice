import { FC, createContext, useState } from "react"
import UploadContent from "./uploadcontent"
export type Content = "UP_LOAD"

export const ModalContext = createContext<{
  updateContent: (content?: Content) => void
}>({ updateContent: () => {} })

const Modal: FC<{ visible: boolean; onClickBackground: () => void }> = ({
  visible,
  onClickBackground,
  children,
}) => {
  return (
    <>
      <div className={"container" + (visible ? " visible" : "")}>
        <div className={"contents"}>{children}</div>
        <div className={"background"} onClick={onClickBackground}></div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          z-index: 100;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          transition: opacity 0.5s, visibility 0s ease-in-out 0.5s;
          opacity: 0;
          visibility: hidden;
        }
        .container.visible {
          transition-delay: 0s;
          opacity: 1;
          visibility: visible;
        }
        .background {
          background: black;
          opacity: 30%;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 1;
        }
        .contents {
          margin: 20px;
          background: white;
          border-radius: 4px;
          padding: 12px 20px;
          max-width: 600px;
          max-height: 610px;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          z-index: 3;
        }
        @media (prefers-color-scheme: dark) {
          .background {
            background: white;
          }
          .contents {
            background: #25282e;
          }
        }
        @media (min-width: 600px) {
          .contents {
            padding: 28px 52px;
          }
        }
      `}</style>
    </>
  )
}

const ModalProvider: FC = ({ children }) => {
  const [content, setContent] = useState<Content>()
  return (
    <ModalContext.Provider value={{ updateContent: setContent }}>
      {children}
      <Modal
        visible={content !== undefined}
        onClickBackground={() => {
          setContent(undefined)
        }}>
        {(() => {
          switch (content) {
            case "UP_LOAD":
              return <UploadContent />
            default:
              return <></>
          }
        })()}
      </Modal>
    </ModalContext.Provider>
  )
}

export default ModalProvider
