import { SerializableVideo, Video } from "~/modules/entity";
import { firestore } from "firebase-admin";
import app from "~/modules/admin";
import { NotFound, NotPublished, Unknown } from "../error";

export interface Response {
  content: SerializableVideo;
  lastupdate: number;
}

const handler = async (id: string): Promise<Response> => {
  try {
    const snapshot = await app?.firestore().collection("contents").doc(id)
      .get();
    if (!snapshot.exists) throw new NotFound();
    const video = snapshot.data() as Video<firestore.Timestamp>;
    if (!video.isPublished || video.draft) throw new NotPublished();
    return {
      content: {
        id: snapshot.ref.id,
        title: video.title ?? null,
        url: video.url
          ? typeof video.url === "string" ? video.url : video.url.hls
          : null,
        poster: video.poster ?? null,
        createdAtMillis: video.createdAt?.toMillis() ?? null,
        state: video.state,
        description: video.description ?? null,
        draft: video.draft,
        isPublished: video.isPublished,
      },
      lastupdate: snapshot.updateTime!.nanoseconds,
    };
  } catch (error) {
    throw new Unknown(typeof error === "string" ? error : "unknown error");
  }
};

export default handler;
