import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/home"
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from "next-firebase-auth"
import Header from "~/components/header"
import fetchContents from "~/modules/api/videos"

import { Props } from "~/templates/home"

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({ AuthUser, query }): Promise<GetServerSidePropsResult<Props>> => {
    try {
      const uid = AuthUser.id
      const response = await fetchContents(uid)
      const targetID = typeof query.id === "string" ? query.id : null
      return {
        props: {
          modal: query.m === "true",
          edit: targetID,
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
