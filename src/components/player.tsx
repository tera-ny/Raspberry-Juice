import {
  FC,
  useEffect,
  useRef,
  useState,
  forwardRef,
  MutableRefObject,
} from "react"
import Hls from "hls.js"
import css from "styled-jsx/css"

interface VideoComponentProps {
  poster?: string
  aspectRatio?: number
}

const getVideoComponentStyle = (aspectRatio?: number) => {
  if (aspectRatio) {
    return css`
      .wrapper {
        position: relative;
        width: 100%;
      }
      .wrapper::before {
        content: "";
        display: block;
        padding-top: calc(100% / ${aspectRatio});
      }
      .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
  } else {
    return css`
      .video {
        width: 100%;
        height: auto;
        background-color: black;
        vertical-align: bottom;
      }
      .wrapper {
        position: relative;
      }
    `
  }
}

const VideoComponentWithRef = forwardRef(
  (
    { poster, aspectRatio }: VideoComponentProps,
    videoRef: MutableRefObject<HTMLVideoElement>
  ) => {
    const styles = getVideoComponentStyle(aspectRatio)
    return (
      <>
        <div className="wrapper">
          <video
            ref={videoRef}
            id="video"
            className="video"
            poster={poster}
            controls
            playsInline
          />
        </div>
        <style jsx>{styles}</style>
      </>
    )
  }
)

VideoComponentWithRef.displayName = "VideoComponent"

interface HLS {
  loadSource: (src: string) => void
  attachMedia: (mediaTag: HTMLMediaElement) => void
}

const Player: FC<{ src?: string; poster?: string; aspectRatio?: number }> = ({
  src,
  poster,
  aspectRatio,
}) => {
  const videoRef = useRef<HTMLVideoElement>()
  const [hls, setHls] = useState<HLS>()
  useEffect(() => {
    if (Hls.isSupported()) {
      setHls(new Hls())
    }
  }, [])
  useEffect(() => {
    const video = videoRef.current
    if (hls && src) {
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src
    }
  }, [src, hls])
  return (
    <>
      <div className="videoContainer">
        <VideoComponentWithRef
          ref={videoRef}
          poster={poster}
          aspectRatio={aspectRatio}
        />
      </div>
    </>
  )
}

export default Player
