export interface Video<Timestamp> {
  owner: string
  title?: string
  url?: string
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
