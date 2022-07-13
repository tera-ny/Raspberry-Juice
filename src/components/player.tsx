import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import css from "styled-jsx/css";

interface VideoComponentProps {
  poster?: string;
  aspectRatio?: number;
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
    `;
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
    `;
  }
};

const VideoComponentWithRef: ForwardRefRenderFunction<
  HTMLVideoElement,
  VideoComponentProps
> = (
  { poster, aspectRatio },
  videoRef,
) => {
  const styles = getVideoComponentStyle(aspectRatio);
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
  );
};

const VideoComponent = forwardRef(VideoComponentWithRef);

interface HLS {
  loadSource: (src: string) => void;
  attachMedia: (mediaTag: HTMLMediaElement) => void;
}

const Player: FC<{ src?: string; poster?: string; aspectRatio?: number }> = ({
  src,
  poster,
  aspectRatio,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hls, setHls] = useState<HLS>();
  useEffect(() => {
    if (Hls.isSupported()) {
      setHls(new Hls());
    }
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (hls && src) {
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src ?? "";
    }
  }, [src, hls]);
  return (
    <>
      <div className="videoContainer">
        <VideoComponent
          poster={poster}
          aspectRatio={aspectRatio}
          ref={videoRef}
        />
      </div>
    </>
  );
};

export default Player;
