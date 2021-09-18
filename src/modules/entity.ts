export interface Video {
  id: string
  owner: string
  title: string
  url: string
  poster?: string
}

export type SerializableVideo = Omit<Video, "poster" | "owner"> & {
  poster: string | null
}
