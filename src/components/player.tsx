import React from "react"
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js"
import "video.js/dist/video-js.css"
import NextHead from "next/head"

interface Props {
  options: VideoJsPlayerOptions
  src: string
}

export default class VideoPlayer extends React.Component<Props, {}> {
  player: VideoJsPlayer
  videoNode: Element
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props.options)
    this.player.src({ src: this.props.src, type: "application/x-mpegURL" })
    this.player.responsive(true)
    this.player.aspectRatio("16:9")
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    return (
      <>
        <div data-vjs-player className={"playerWrapper"}>
          <video
            ref={(node) => (this.videoNode = node)}
            className="video-js vjs-default-skin vjs-big-play-centered video"
            src={this.props.src}></video>
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
}
