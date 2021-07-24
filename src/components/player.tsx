import {
  FC,
  useEffect,
  useMemo,
  useRef,
  forwardRef,
  MutableRefObject,
} from "react"
import Hls from "hls.js"
import NextHead from "next/head"
import { useState } from "react"
import { useWindowEvent } from "~/modules/hooks"

interface SeekBarProps {
  buffer: number
  current: number
  length: number
}

const SeekBar: FC<SeekBarProps> = ({ buffer, current, length }) => {
  const cursor = useRef<HTMLDivElement>()
  const [isSeek, setIsSeek] = useState(false)
  useEffect(() => {
    if (!cursor.current) return
    const handler = (e: TouchEvent) => {
      setIsSeek(true)
    }
    cursor.current.addEventListener("mousedown", handler)
    return () => {
      cursor.current.removeEventListener("mousedown", handler)
    }
  }, [cursor.current])
  useWindowEvent(
    "mouseup",
    () => {
      setIsSeek(false)
    },
    []
  )
  useWindowEvent(
    "mousemove",
    () => {
      if (isSeek) {
        console.log("seeked")
      }
    },
    [isSeek]
  )
  return (
    <>
      <div className="seek_bar_wrapper" ref={cursor}>
        <div
          className="buffer_progress_bar"
          style={{
            width: length > 0 && buffer > 0 ? `${100 * (buffer / length)}%` : 0,
          }}></div>
        <div
          className="current_position_bar"
          style={{
            width:
              length > 0 && current > 0 ? `${100 * (current / length)}%` : 0,
          }}></div>
        <div className="cursor"></div>
      </div>
      <style jsx>{`
        .seek_bar_wrapper {
          position: relative;
          height: 100%;
          background: #a3a3a3;
          border-radius: calc(5px / 2);
          overflow: hidden;
        }
        .seek_bar_wrapper > div {
          position: absolute;
          height: 100%;
        }
        .buffer_progress_bar {
          background: white;
        }
        .current_position_bar {
          background: #ffcc4a;
        }
        .cursor {
          width: 12px;
          height: 12px;
        }
        .cursor:hover {
          width: 18px;
          height: 18px;
        }
      `}</style>
    </>
  )
}

interface VideoComponentProps {
  poster?: string
}

const VideoComponentWithRef = forwardRef(
  (
    { poster }: VideoComponentProps,
    videoRef: MutableRefObject<HTMLVideoElement>
  ) => {
    const isSupportBrowser = useMemo(() => Hls.isSupported(), [])
    const [currentTime, setCurrentTime] = useState(0)
    const [buffered, setBuffered] = useState(0)
    const [duration, setDuration] = useState(0)
    useEffect(() => {
      const video = videoRef.current
      if (!video) return
      const listener = () => {
        setDuration(video.duration)
      }
      video.addEventListener("durationchange", listener)
      return () => {
        video.removeEventListener("durationchange", listener)
      }
    }, [videoRef.current])
    useEffect(() => {
      const video = videoRef.current
      if (!video) return
      const interval = setInterval(() => {
        setCurrentTime(video.currentTime ?? 0)
        if (video.buffered.length > 0) {
          setBuffered(video.buffered.end(0))
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }, [videoRef.current])
    return (
      <>
        <div className="wrapper">
          <video ref={videoRef} id="video" className="video" controls={true} />
          {isSupportBrowser && (
            <div className="control_container">
              <div className="control_contents">
                <div className="seek_bar_container">
                  <SeekBar
                    current={currentTime}
                    buffer={buffered}
                    length={duration}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <style jsx>{`
          .video {
            width: 100%;
            height: auto;
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
            height: 116px;
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
            height: 5px;
          }
        `}</style>
      </>
    )
  }
)

interface Props {
  src: string
  poster?: string
}

const Player: FC<Props> = ({ src, poster }) => {
  const isSupportBrowser = useMemo(() => Hls.isSupported(), [])
  const videoRef = useRef<HTMLVideoElement>()
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isSupportBrowser) {
      var hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src
    }
  }, [src, videoRef.current])
  return (
    <>
      <NextHead>
        <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
      </NextHead>
      <div className="videoContainer">
        <VideoComponentWithRef ref={videoRef} poster={poster} />
      </div>
    </>
  )
}

export default Player
