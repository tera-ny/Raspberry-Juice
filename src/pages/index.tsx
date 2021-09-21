import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/home"
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
  getFirebaseAdmin,
} from "next-firebase-auth"
import Header from "~/components/header"
import { SerializableVideo } from "~/modules/entity"
import { generateCDNCookies } from "~/modules/storagecookie"

import dayjs from "dayjs"

import { Props } from "~/templates/home"

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({
    AuthUser,
    res,
    query,
  }): Promise<GetServerSidePropsResult<Props>> => {
    const uid = AuthUser.id
    const snapshot = await getFirebaseAdmin()
      .firestore()
      .collection("contents")
      .where("type", "==", "video")
      .where("owner", "==", uid)
      .where("draft", "==", false)
      .orderBy("createdAt", "desc")
      .get()
    const videos = snapshot.docs.map(
      (doc): SerializableVideo => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title ?? "無題",
          url: data.url ?? "",
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
        upload: query.upload === "true",
        videos,
      },
    }
  }
)

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <Header />
      <main>
        <Template {...props} />
      </main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
