import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/home"
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
import Header from "~/components/header"
import fetchContents from "~/modules/api/videos"
import fetchContent from "~/modules/api/videos/id"

import { Props } from "~/templates/home"
import { SerializableVideo } from "~/modules/entity"

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({ AuthUser, query }): Promise<GetServerSidePropsResult<Props>> => {
    try {
      const uid = AuthUser.id
      const response = await fetchContents(uid)
      const targetID = query.id
      let edit: SerializableVideo = null
      if (typeof targetID === "string") {
        const response = await fetchContent(targetID, uid)
        edit = response.content.draft ? null : response.content
      }
      return {
        props: {
          modal: query.m === "true",
          edit,
          contents: response.contents,
        },
      }
    } catch (error) {
      return {
        notFound: true,
      }
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
