import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/video"
import Error from "next/error"
import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from "next-firebase-auth"
import api from "~/modules/api/videos/id"
import { SerializableVideo } from "~/modules/entity"
import dayjs from "dayjs"
import { generateCDNCookies } from "~/modules/storagecookie"
import Header from "~/components/header"

interface Props {
  video?: SerializableVideo
  error?: number
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({
    AuthUser,
    res,
    query,
  }): Promise<GetServerSidePropsResult<Props>> => {
    if (typeof query.id === "string" && query.id !== "video") {
      try {
        const reponse = await api(query.id, AuthUser.id)
        const expiresOfUnix = dayjs().add(1, "day").unix()
        const isSecure = process.env.ENVIRONMENT !== "development"
        const cdnCookies = await generateCDNCookies(
          [query.id],
          expiresOfUnix,
          isSecure
        )
        res.setHeader("Set-Cookie", cdnCookies)
        return {
          props: {
            video: reponse.content,
          },
        }
      } catch (error) {
        if (error === 404) {
          return {
            notFound: true,
          }
        } else {
          return {
            props: {
              error: 500,
            },
          }
        }
      }
    } else {
      return {
        notFound: true,
      }
    }
  }
)

const Page: NextPage<Props> = ({ video, error }) => {
  if (!video) {
    return <Error statusCode={error} />
  } else {
    return (
      <>
        <Header />
        <main>
          <Template video={video} />
        </main>
      </>
    )
  }
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
