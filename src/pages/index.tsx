import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/home"
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
  getFirebaseAdmin,
} from "next-firebase-auth"
import Header from "~/components/header"
import { SerializableVideo, Video } from "~/modules/entity"
import { generateCDNCookies } from "~/modules/storagecookie"
import dayjs from "dayjs"
interface Props {
  videos: SerializableVideo[]
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({ AuthUser, res }): Promise<GetServerSidePropsResult<{}>> => {
    const uid = AuthUser.id
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("contents")
      .where("type", "==", "video")
      .get()
    const videos = snapshot.docs.map(
      (doc): Video => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title,
          url: data.url,
          poster: data.poster ?? null,
        }
      }
    )
    const contentIDs = snapshot.docs.map((doc) => doc.id)
    const expiresOfUnix = dayjs().add(1, "day").unix()
    const isSecure = process.env.ENVIRONMENT !== "development"
    const cookies = await generateCDNCookies(
      contentIDs,
      expiresOfUnix,
      isSecure
    )
    res.setHeader("Set-Cookie", cookies)
    return {
      props: {
        videos,
      },
    }
  }
)

const Page: NextPage<Props> = ({ videos }) => {
  return (
    <>
      <Header />
      <main>
        <Template videos={videos} />
      </main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
