import { NextPage, GetServerSideProps } from "next"
import Template from "~/templates/video"
import Error from "next/error"
import api from "~/modules/api/videos/id"
import { SerializableVideo } from "~/modules/entity"
import dayjs from "dayjs"
import { generateCDNCookies } from "~/modules/storagecookie"
import Header from "~/components/header"
import { verifyAuthCookie } from "~/modules/auth/login"
import { Cookies } from "~/modules/utils"

interface Props {
  video?: SerializableVideo
  error?: number
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  query,
}) => {
  if (typeof query.id === "string" && query.id !== "video") {
    try {
      const decoded = await verifyAuthCookie(req)
      const reponse = await api(query.id, decoded.uid)
      const expiresOfUnix = dayjs().add(1, "day").unix()
      const isSecure = process.env.ENVIRONMENT !== "development"
      const cdnCookies = await generateCDNCookies(
        [query.id],
        expiresOfUnix,
        isSecure
      )
      const cookies = new Cookies(res)
      cookies.setValue(cdnCookies)
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
        console.error(error)
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

export default Page
