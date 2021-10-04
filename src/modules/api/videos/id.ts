import initAuth from "~/modules/nextauth"
import { getFirebaseAdmin } from "next-firebase-auth"
import { SerializableVideo, Video } from "~/modules/entity"
import { firestore } from "firebase-admin"

initAuth()

export interface Response {
  content: SerializableVideo
}

const handler = async (id: string, uid: string): Promise<Response> => {
  try {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("contents")
      .doc(id)
      .get()
    const video = snapshot.data() as Video<firestore.Timestamp>
    if (snapshot.exists && video.owner === uid && video.draft === false) {
      return {
        content: {
          id: snapshot.ref.id,
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
