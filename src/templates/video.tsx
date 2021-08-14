import { FC } from "react"
import auth from "~/stores/auth"
import "firebase/auth"
import "firebase/firestore"
import video from "~/stores/video"
import Player from "~/components/player"
import { useRecoilValue } from "recoil"

interface Props {
  id: string
}

const Index: FC<Props> = ({ id }) => {
  auth.effect.listenCDNSession()
  video.effect.listenVideo(id)
  const content = useRecoilValue(video.atom)

  return (
    <>
      <div className={"container"}>
        <div className={"primary"}>
          <div className={"playerContainer"}>
            <Player />
          </div>
          <h2>{content?.title}</h2>
        </div>
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          padding: 40px 20px 0;
          max-width: 900px;
          display: grid;
        }
      `}</style>
    </>
  )
}

export default Index
