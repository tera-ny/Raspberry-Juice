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
import { useWindowEvent, usePrevious } from "~/modules/hooks"
import { useCallback } from "react"
import auth from "~/stores/auth"
import { useRecoilValue } from "recoil"

interface SeekBarProps {
  buffer: number
  currentTime: number
  duration: number
  seeked: (time: number) => void
}
const cursorWidth = 12

const calcCursorPositionX = (pageX: number, seekbarRect: DOMRect) => {
  const positionX = pageX - seekbarRect.x - cursorWidth / 2
  return Math.max(0, Math.min(seekbarRect.width - cursorWidth, positionX))
}

const SeekBar: FC<SeekBarProps> = ({
  buffer,
  currentTime,
  duration,
  seeked,
}) => {
  const cursor = useRef<HTMLDivElement>()
  const seekbar = useRef<HTMLDivElement>()
  const [isSeek, setIsSeek] = useState(false)
  const [isMouseOver, setIsMouseOver] = useState(false)
  const seekbarRect = useMemo(
    () =>
      seekbar.current ? seekbar.current.getBoundingClientRect() : undefined,
    [seekbar.current, window.innerWidth]
  )
  useEffect(() => {
    if (!(cursor.current && seekbar.current)) return
    const mouseOverHandler = (e: MouseEvent) => {
      setIsMouseOver(true)
    }
    const mouseLeaveHandler = (e: MouseEvent) => {
      setIsMouseOver(false)
    }
    const mouseDownHandler = (e: MouseEvent) => {
      setIsSeek(true)
      cursor.current.style.transform = `translateX(${calcCursorPositionX(
        e.pageX,
        seekbarRect
      )}px)`
    }
    seekbar.current.addEventListener("mouseenter", mouseOverHandler)
    seekbar.current.addEventListener("mouseleave", mouseLeaveHandler)
    seekbar.current.addEventListener("mousedown", mouseDownHandler)
    return () => {
      seekbar.current.removeEventListener("mouseenter", mouseOverHandler)
      seekbar.current.removeEventListener("mouseleave", mouseLeaveHandler)
      seekbar.current.removeEventListener("mousedown", mouseDownHandler)
    }
  }, [seekbar.current, seekbarRect])
  const handleSeek = useCallback(
    (pageX: number) => {
      if (!seekbarRect) return
      cursor.current.style.transform = `translateX(${calcCursorPositionX(
        pageX,
        seekbarRect
      )}px)`
    },
    [cursor.current, seekbarRect]
  )
  useEffect(() => {
    if (!seekbar.current) return
    const handleTouchEvent = (e: TouchEvent) => {
      const touches = e.changedTouches
      if (touches.length > 0) {
        handleSeek(touches[0].pageX)
      }
    }
    const handleTouchEndEvent = (e: TouchEvent) => {
      const touches = e.changedTouches
      if (touches.length > 0) {
        if (!touches[0].pageX) return
        seeked(
          (duration * calcCursorPositionX(touches[0].pageX, seekbarRect)) /
            seekbarRect.width
        )
      }
    }
    seekbar.current.addEventListener("touchstart", handleTouchEvent)
    seekbar.current.addEventListener("touchmove", handleTouchEvent)
    seekbar.current.addEventListener("touchend", handleTouchEndEvent)
    return () => {
      seekbar.current.removeEventListener("touchstart", handleTouchEvent)
      seekbar.current.removeEventListener("touchmove", handleTouchEvent)
      seekbar.current.removeEventListener("touchend", handleTouchEndEvent)
    }
  }, [seekbar.current, seekbarRect, isSeek, seeked, duration])
  useWindowEvent(
    "mouseup",
    (e: MouseEvent) => {
      if (isSeek) {
        setIsSeek(false)
        seeked(
          (duration * calcCursorPositionX(e.pageX, seekbarRect)) /
            seekbarRect.width
        )
      }
    },
    [seeked, isSeek, setIsSeek, duration, seekbarRect]
  )
  useWindowEvent(
    "mousemove",
    (e) => {
      e.preventDefault()
      if (isSeek) {
        handleSeek(e.pageX)
      }
    },
    [isSeek, seekbarRect]
  )
  useEffect(() => {
    cursor.current.style.visibility =
      isSeek || isMouseOver ? "visible" : "hidden"
  }, [isSeek, isMouseOver, cursor.current])
  useEffect(() => {
    if (!isSeek && seekbarRect) {
      cursor.current.style.transform = `translateX(${
        (currentTime * seekbarRect.width) / duration - cursorWidth / 2
      }px)`
    }
  }, [currentTime, duration, isSeek, seekbarRect?.width])
  return (
    <>
      <div className="seek_bar" ref={seekbar}>
        <div className="bar_wrapper">
          <div
            className="buffer_progress_bar"
            style={{
              width:
                duration > 0 && buffer > 0
                  ? `${100 * (buffer / duration)}%`
                  : 0,
            }}></div>
          <div
            className="current_position_bar"
            style={{
              width:
                duration > 0 && currentTime > 0
                  ? `${100 * (currentTime / duration)}%`
                  : 0,
            }}></div>
        </div>
        <div className="cursor" ref={cursor}></div>
      </div>
      <style jsx>{`
        .seek_bar {
          position: relative;
          cursor: pointer;
          padding: 4px 0;
          height: var(--seek-bar-height);
        }
        .bar_wrapper {
          position: absolute;
          width: 100%;
          height: var(--seek-bar-height);
          background: #a3a3a3;
          border-radius: calc(var(--seek-bar-height) / 2);
          overflow: hidden;
        }
        .bar_wrapper > div {
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
          position: absolute;
          background: #ffcc4a;
          width: var(--cursor-width);
          height: var(--cursor-width);
          top: calc(
            (var(--cursor-width) - var(--seek-bar-height) - 7.5px) * -0.5
          );
          border-radius: 8px;
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
    const [currentTime, setCurrentTime] = useState(0)
    const [buffered, setBuffered] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    useEffect(() => {
      const video = videoRef.current
      if (!video) return
      const handleDurationChanged = () => {
        setDuration(video.duration)
      }
      const handleIsPlaying = (playing: boolean) => () => {
        setIsPlaying(playing)
      }
      const handlePlay = handleIsPlaying(true)
      const handlePause = handleIsPlaying(false)
      video.addEventListener("durationchange", handleDurationChanged)
      video.addEventListener("pause", handlePause)
      video.addEventListener("play", handlePlay)
      return () => {
        video.removeEventListener("durationchange", handleDurationChanged)
        video.removeEventListener("pause", handlePause)
        video.removeEventListener("play", handlePlay)
      }
    }, [videoRef.current])
    useEffect(() => {
      if (!videoRef.current) return
      const video = videoRef.current
      const handleBuffer = () => {
        if (video.buffered.length > 0) {
          setBuffered(video.buffered.end(0))
        }
      }
      video.addEventListener("progress", handleBuffer)
      return () => {
        video.removeEventListener("progress", handleBuffer)
      }
    }, [videoRef.current])
    useEffect(() => {
      const video = videoRef.current
      if (!video) return
      setCurrentTime(video.currentTime ?? 0)
      if (!isPlaying) return
      const interval = setInterval(() => {
        setCurrentTime(video.currentTime ?? 0)
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    }, [videoRef.current, isPlaying])
    const handleSeek = useCallback(
      (time: number) => {
        videoRef.current.currentTime = time
        setCurrentTime(time)
      },
      [videoRef.current]
    )
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
          <div className="control_container">
            <div className="control_contents">
              <div className="seek_bar_container">
                <SeekBar
                  currentTime={currentTime}
                  buffer={buffered}
                  duration={duration}
                  seeked={handleSeek}
                />
              </div>
            </div>
          </div>
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

interface Props {
  src: string
  poster?: string
}

const Player: FC<Props> = ({ src, poster }) => {
  const isSupportBrowser = useMemo(() => Hls.isSupported(), [])
  const videoRef = useRef<HTMLVideoElement>()
  const expires = useRecoilValue(auth.selector.sessionExpires)
  const prevexpires = usePrevious(expires)
  useEffect(() => {
    const video = videoRef.current
    if (!(video && expires)) return
    //TODO: srcが変更された時だけ更新するようにしたい。
    if (prevexpires !== undefined) return
    if (isSupportBrowser) {
      var hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src
    }
  }, [src, prevexpires, videoRef.current, expires])
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