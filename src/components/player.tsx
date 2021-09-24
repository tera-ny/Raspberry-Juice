import {
  FC,
  useEffect,
  useRef,
  useState,
  forwardRef,
  MutableRefObject,
} from "react"
import Hls from "hls.js"

interface VideoComponentProps {
  poster?: string
}

const VideoComponentWithRef = forwardRef(
  (
    { poster }: VideoComponentProps,
    videoRef: MutableRefObject<HTMLVideoElement>
  ) => {
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
        <style jsx>{`
          .video {
            width: 100%;
            height: auto;
            background-color: black;
            vertical-align: bottom;
          }
          .wrapper {
            position: relative;
          }
          .control_container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 20%;
            padding: 20px;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(0, 0, 0, 0.5) 47%,
              rgba(0, 0, 0, 0.7) 100%
            );
          }
          .control_contents {
            position: relative;
            height: 100%;
          }
          .seek_bar_container {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }
        `}</style>
      </>
    )
  }
)

interface HLS {
  loadSource: (src: string) => void
  attachMedia: (mediaTag: HTMLMediaElement) => void
}

const Player: FC<{ src?: string; poster?: string }> = ({ src, poster }) => {
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
        <VideoComponentWithRef ref={videoRef} poster={poster} />
      </div>
    </>
  )
}

export default Player
