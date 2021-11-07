export interface Video<Timestamp> {
  owner: string
  title?: string
  url?: string | { hls: string; mpd: string }
  poster?: string
  createdAt?: Timestamp
  description?: string
  draft: boolean
  state?: "uploaded" | "transcoded"
}

export interface SerializableVideo {
  id: string
  owner: string
  title: string | null
  url: string | null
  poster: string | null
  createdAtMillis: number | null
  description: string | null
  draft: boolean
  state?: "uploaded" | "transcoded"
}

export interface EditingVideo {
  title: string
  poster: string
  url?: string
  description?: string
  readonly state: "uploaded" | "transcoded"
}

export interface Profile<TimeStamp> {
  name: string
  description: string
  registeredAt: TimeStamp
  background?: string
  icon?: string
  theme: number
}

export type SerializableProfile = Omit<Profile<any>, "registeredAt"> & {
  id: string
  registeredAtMillis: number
  links: {
    text: string
    url: string
  }[]
}
