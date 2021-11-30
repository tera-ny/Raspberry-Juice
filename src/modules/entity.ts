export interface Video<Timestamp> {
  owner: string
  title?: string
  url?: string | { hls: string; mpd: string }
  poster?: string
  createdAt?: Timestamp
  description?: string
  isPublished: boolean
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

export interface ResizableImage {
  medium: string
  small?: string
  large?: string
  thumbnail?: string
}

export type ResizableImageWithID = ResizableImage & {
  meta: {
    id: string
    originRef: string
  }
}

export type Image = ResizableImageWithID & {
  meta: {
    uploader?: string
    isPrivate?: boolean
  }
}

export interface Profile<TimeStamp> {
  name: string
  description: string
  registeredAt: TimeStamp
  banner?: ResizableImageWithID
  isActive: boolean
  isBanned: boolean
  icon?: string
  theme: number
}

export type SerializableProfile = Omit<
  Profile<any>,
  "registeredAt" | "isActive" | "isBanned"
> & {
  id: string
  registeredAtMillis: number
  links: {
    text: string
    url: string
  }[]
}
