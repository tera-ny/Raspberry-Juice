import { getFirebaseAdmin } from "next-firebase-auth"
import { SerializableVideo, Video } from "~/modules/entity"
import { firestore } from "firebase-admin"

export interface Response {
  content: SerializableVideo
  isPublished: boolean
}

const handler = async (id: string): Promise<Response> => {
  try {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("contents")
      .doc(id)
      .get()
    const video = snapshot.data() as Video<firestore.Timestamp>
    if (snapshot.exists && video.draft === false) {
      return {
        content: {
          id: snapshot.ref.id,
          owner: video.owner,
          title: video.title ?? null,
          url: video.url
            ? typeof video.url === "string"
              ? video.url
              : video.url.hls
            : null,
          poster: video.poster ?? null,
          createdAtMillis: video.createdAt?.toMillis() ?? null,
          state: video.state,
          description: video.description ?? null,
          draft: video.draft,
        },
        isPublished: video.isPublished,
      }
    } else {
      throw 404
    }
  } catch (error) {
    console.error(error)
    throw 500
  }
}

export default handler
