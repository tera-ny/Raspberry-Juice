import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/video"
import Error from "next/error"
import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from "next-firebase-auth"
import getAbsoluteURL from "~/modules/getAbsoluteURL"
import { Video } from "~/modules/entity"
import dayjs from "dayjs"
import { generateCDNCookies } from "~/modules/storagecookie"
import Header from "~/components/header"
import Modal from "~/components/modal"

interface Props {
  video?: Video
  error?: number
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(
  async ({
    AuthUser,
    req,
    res,
    query,
  }): Promise<GetServerSidePropsResult<Props>> => {
    const token = await AuthUser.getIdToken()
    if (typeof query.id === "string") {
      if (query.id === "video") return { props: { error: 400 } }
      const endpoint = getAbsoluteURL(`/api/video?id=${query.id}`, req)
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: token || "unauthenticated",
        },
      })
      if (response.status === 200) {
        const video = await response.json()
        const expiresOfUnix = dayjs().add(1, "day").unix()
        const isSecure = process.env.ENVIRONMENT !== "development"
        const cdnCookies = await generateCDNCookies(
          [query.id],
          expiresOfUnix,
          isSecure
        )
        res.setHeader("Set-Cookie", cdnCookies)
        return {
          props: video,
        }
      } else {
        return {
          props: {
            error: response.status,
          },
        }
      }
    } else {
      return {
        props: {
          error: 404,
        },
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
