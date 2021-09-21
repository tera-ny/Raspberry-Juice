import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/home"
import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
  getFirebaseAdmin,
} from "next-firebase-auth"
import Header from "~/components/header"
import api from "~/modules/api/videos"

import { Props } from "~/templates/home"

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({ AuthUser, query }): Promise<GetServerSidePropsResult<Props>> => {
    try {
      const uid = AuthUser.id
      const response = await api(uid)
      return {
        props: {
          upload: query.upload === "true",
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
