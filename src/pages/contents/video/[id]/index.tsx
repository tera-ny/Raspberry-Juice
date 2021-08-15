import { NextPage } from "next"
import Template from "~/templates/video"
import Error from "next/error"
import { withAuthUserTokenSSR, AuthAction } from "next-firebase-auth"
import getAbsoluteURL from "~/modules/getAbsoluteURL"
import { Video } from "~/modules/entity"

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
      const session = await fetch(
        "https://asia-northeast1-orange-juice-prod.cloudfunctions.net/http-sessionCookie",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              path: `users/${AuthUser.id}/`,
            },
          }),
        }
      ).then((response) => response.json())
      res.setHeader(
        "Set-Cookie",
        `Cloud-CDN-Cookie=${session.result.token}; Path=${session.result.path}; Expires=${session.result.expires}; Secure; HttpOnly`
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
