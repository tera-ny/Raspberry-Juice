import { SerializableVideo, Video } from "~/modules/entity";
import { firestore } from "firebase-admin";
import app from "~/modules/admin";

export interface Response {
  contentIDs: string[];
  contents: SerializableVideo[];
}

const handler = async (uid: string): Promise<Response> => {
  try {
    const snapshot = await app
      .firestore()
      .collection("contents")
      .where("type", "==", "video")
      .where("owner", "==", uid)
      .where("draft", "==", false)
      .where("isPublished", "==", true)
      .orderBy("createdAt", "desc")
      .get();
    const contentIDs = snapshot.docs.map((doc) => doc.id);
    const contents = snapshot.docs.map((doc): SerializableVideo => {
      const data = doc.data() as Video<firestore.Timestamp>;
      return {
        id: doc.id,
        title: data.title ?? null,
        url: data.url
          ? typeof data.url === "string" ? data.url : data.url.hls
          : null,
        poster: data.poster ?? null,
        createdAtMillis: data.createdAt?.toMillis() ?? null,
        description: data.description ?? null,
        draft: data.draft,
        isPublished: data.isPublished,
      };
    });
    return {
      contentIDs,
      contents,
    };
  } catch (error) {
    console.error(error);
    throw 500;
  }
};

export default handler;
