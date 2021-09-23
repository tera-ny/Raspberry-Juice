export interface Video<Timestamp> {
  owner: string
  title?: string
  url?: string | { hls: string; mpd: string }
  poster?: string
  createdAt?: Timestamp
}

export interface SerializableVideo {
  id: string
  title: string | null
  url: string | null
  poster: string | null
  createdAtMillis: number | null
}
