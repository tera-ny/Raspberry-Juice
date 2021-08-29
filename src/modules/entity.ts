export interface Video {
  id: string
  title: string
  url: string
  poster?: string
}

export type SerializableVideo = Omit<Video, "poster"> & {
  poster: string | null
}
