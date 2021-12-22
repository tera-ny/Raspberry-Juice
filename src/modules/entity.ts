import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from "firebase/firestore"

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
  title: string | null
  url: string | null
  poster: string | null
  createdAtMillis: number | null
  description: string | null
  isPublished: boolean | null
  draft: boolean
  state?: "uploaded" | "transcoded"
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
  icon?: ResizableImageWithID
  theme: number
}

export const profileConvertor: FirestoreDataConverter<Profile<Timestamp>> = {
  toFirestore: (data: WithFieldValue<Profile<Timestamp>>): DocumentData => {
    return data
  },
  fromFirestore: (
    snapshot: QueryDocumentSnapshot<DocumentData>
  ): Profile<Timestamp> => {
    const data = snapshot.data()
    return data as Profile<Timestamp>
  },
}

export const imageConvertor: FirestoreDataConverter<Image> = {
  toFirestore: (data: WithFieldValue<Image>): DocumentData => {
    return data
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot<DocumentData>): Image => {
    const data = snapshot.data()
    return data as Image
  },
}

export enum Path {
  Creator = "creators",
  Image = "images",
  Content = "contents",
}
