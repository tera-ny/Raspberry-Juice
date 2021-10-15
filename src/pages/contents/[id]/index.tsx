import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/video"
import {
  withAuthUserTokenSSR,
  AuthAction,
  withAuthUser,
} from "next-firebase-auth"
import api from "~/modules/api/videos/id"
import { SerializableVideo } from "~/modules/entity"
import dayjs from "dayjs"
import { generateCDNCookies, makeCookieString } from "~/modules/storagecookie"
import Header from "~/components/header"
import dynamic from "next/dynamic"
import Modal from "~/components/modal"
import { useRecoilValue } from "recoil"
import auth from "~/stores/auth"
import { useRouter } from "next/router"
import { ServerResponse } from "http"

type Props = {
  edit: boolean
  video?: SerializableVideo
}

const ExpiresKey = "CookieExpires"

const handleCookie = async (
  res: ServerResponse,
  id: string,
  expiresOfUnix?: number
) => {
  const now = dayjs()
  if (!(expiresOfUnix && now.unix() + 300 < expiresOfUnix)) {
    try {
      const expires = now.add(1, "day")
      expiresOfUnix = expires.unix()
      const isSecure = process.env.ENVIRONMENT !== "development"
      const cdnCookies = await generateCDNCookies([id], expiresOfUnix, isSecure)
      res.setHeader(
        "Set-Cookie",
        cdnCookies.concat([
          makeCookieString(
            ExpiresKey,
            expiresOfUnix.toString(),
            expires.toDate(),
            isSecure,
            `/contents/${id}`
          ),
        ])
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  }
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
    let content: SerializableVideo
    if (!(typeof query.id === "string" && query.id !== "video"))
      return { notFound: true }
    try {
      content = (await api(query.id, AuthUser.id)).content
    } catch (error) {
      return {
        notFound: true,
      }
    }
    const isEdit = query.edit === "true"
    if (isEdit && content.owner !== AuthUser.id) {
      return {
        redirect: {
          permanent: false,
          destination: "/contents/" + query.id,
        },
      }
    } else {
    }
    const cookie = req.cookies[ExpiresKey]
    let expiresOfUnix = parseInt(cookie)
    handleCookie(res, query.id, expiresOfUnix)
    return {
      props: {
        edit: query.edit === "true",
        video: content,
      },
    }
  }
)

const EditContent = dynamic(() => import("~/components/editcontent"))

const Page: NextPage<Props> = ({ video, edit }) => {
  const uid = useRecoilValue(auth.selector.uid)
  const router = useRouter()
  return (
    <>
      <Header />
      <main>
        <Template video={video} />
        {
          <Modal
            visible={edit && uid && video.owner === uid}
            onClickBackground={() => {
              router.replace({
                pathname: video ? `/contents/${video.id}` : "/",
              })
            }}>
            <EditContent {...video} />
          </Modal>
        }
      </main>
    </>
  )
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Page)
