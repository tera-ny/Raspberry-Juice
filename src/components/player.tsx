import React, { useEffect, useMemo } from "react"
import Hls from "hls.js"
import NextHead from "next/head"
import { FC } from "react"

interface Props {
  src: string
}

const Player: FC<Props> = ({ src }) => {
  const isSupportBrowser = useMemo(() => Hls.isSupported(), [])
  useEffect(() => {
    var video = document.getElementById("video") as HTMLMediaElement
    if (isSupportBrowser) {
      var hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    }
  }, [src])
  return (
    <>
      <NextHead>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      </NextHead>
      <div className="videoContainer">
        {isSupportBrowser ? (
          <div>
            <video id="video" className="video" controls></video>
          </div>
        ) : (
          <div className="notSupportBrowser">
            申し訳ありませんが、お使いのブラウザでは動画再生をサポートしていません。
            ご了承のほどよろしくお願いします。
          </div>
        )}
      </div>
      <style jsx>{`
        .video {
          width: 100%;
          height: auto;
        }
      `}</style>
    </>
  )
}

export default Player
