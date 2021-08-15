import { NextPage } from "next"
import Template from "~/templates/video"
import Error from "next/error"
import { withAuthUserTokenSSR, AuthAction } from "next-firebase-auth"
import getAbsoluteURL from "~/modules/getAbsoluteURL"
import { Video } from "~/modules/entity"
import dayjs from "dayjs"
import { generateSignature } from "~/modules/storagecookie"

interface Props {
  video?: Video
  error?: number
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req, res, query }) => {
  const token = await AuthUser.getIdToken()
  if (typeof query.id === "string") {
    const endpoint = getAbsoluteURL(`/api/video?id=${query.id}`, req)
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: token || "unauthenticated",
      },
    })
    if (response.status === 200) {
      const expiresOfUnix = dayjs().add(1, "day").unix()
      //TODO: valid path
      const path = `/media/users/${AuthUser.id}/${query.id}/`
      const sessionToken = await generateSignature(path, expiresOfUnix)
      res.setHeader(
        "Set-Cookie",
        `Cloud-CDN-Cookie=${sessionToken}; Path=${path}; Expires=${new Date(
          expiresOfUnix * 1000
        ).toUTCString()}; Secure; HttpOnly`
      )
      const video = await response.json()
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
})

const Page: NextPage<Props> = ({ video, error }) => {
  if (!video) {
    return <Error statusCode={error} />
  } else {
    return (
      <>
        <main>
          <Template video={video} />
        </main>
      </>
    )
  }
}

export default Page
