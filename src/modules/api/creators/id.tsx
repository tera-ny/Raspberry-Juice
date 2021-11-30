import { getFirebaseAdmin } from "next-firebase-auth"
import { SerializableProfile, Profile } from "~/modules/entity"
import { firestore } from "firebase-admin"

export interface Response {
  profile: SerializableProfile
}

const handler = async (id: string): Promise<Response> => {
  try {
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("creators")
      .doc(id)
      .get()
    const profile = snapshot.data() as Profile<firestore.Timestamp>
    if (snapshot.exists && profile.isActive && !profile.isBanned) {
      return {
        profile: {
          id: snapshot.id,
          name: profile.name,
          description: profile.description,
          registeredAtMillis: profile.registeredAt.toMillis(),
          theme: profile.theme,
          //TODO: fetch links
          links: [],
          banner: profile.banner ?? null,
          icon: profile.icon ?? null,
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
