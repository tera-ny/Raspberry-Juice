import {
  FC,
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useState,
} from "react";
import Hls from "hls.js";
import { classNames } from "~/modules/className";

interface VideoComponentProps {
  poster?: string;
  aspectRatio?: number;
}

const VideoComponentWithRef: ForwardRefRenderFunction<
  HTMLVideoElement,
  VideoComponentProps
> = (
  { poster, aspectRatio },
  videoRef,
) => {
  return (
    <>
      <div
        className={classNames({
          wrapper: true,
          withAspectRatio: aspectRatio !== undefined,
        })}
      >
        <video
          ref={videoRef}
          id="video"
          className={classNames({
            video: true,
            withAspectRatio: aspectRatio !== undefined,
          })}
          poster={poster}
          controls
          playsInline
        />
      </div>
      <style jsx>
        {`
      .video {
        width: 100%;
        height: auto;
        background-color: black;
        vertical-align: bottom;
      }
      .video.withAspectRatio {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .wrapper {
        position: relative;
        width: 100%;
      }
      .wrapper.withAspectRatio::before {
        content: "";
        display: block;
        padding-top: calc(100% / ${aspectRatio});
      }
      `}
      </style>
    </>
  );
};

// eslint-disable-next-line react/display-name
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
