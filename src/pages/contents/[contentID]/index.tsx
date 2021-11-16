import { NextPage, GetServerSidePropsResult } from "next"
import Template from "~/templates/video"
import { withAuthUserTokenSSR, withAuthUser } from "next-firebase-auth"
import fetchVideo from "~/modules/api/videos/id"
import { SerializableVideo } from "~/modules/entity"
import dayjs from "dayjs"
import { generateCDNCookies } from "~/modules/storagecookie"
import Header from "~/components/header"
import dynamic from "next/dynamic"
import Modal from "~/components/modal"
import { useRecoilValue } from "recoil"
import auth from "~/stores/auth"
import { useRouter } from "next/router"
import { ServerResponse } from "http"
import { useCallback, useMemo } from "react"
import { UnPromisify } from "~/modules/utils/type"

type Props = {
  edit: boolean
  video?: SerializableVideo
}

const setCDNCookie = async (
  res: ServerResponse,
  id: string,
  expiresOfUnix?: number
) => {
  const isSecure = process.env.ENVIRONMENT !== "development"
  const cdnCookies = await generateCDNCookies([id], expiresOfUnix, isSecure)
  res.setHeader("Set-Cookie", cdnCookies)
}

const validID = (id: any) => {
  return typeof id === "string" && id !== "video"
}

const idKey = "contentID"
const editKey = "edit"

interface Query {
  [idKey]: string
  [editKey]: boolean
}

const validQueryKey = (keys: string[]) => {
  return (
    !!keys.length &&
    keys.length <= 2 &&
    keys.includes("contentID") &&
    (keys.length === 1 || keys.includes("edit"))
  )
}

const validQueryValueType = (query: any) => {
  return (
    validID(query[idKey]) &&
    (typeof query[editKey] === "undefined" || query[editKey] === "true")
  )
}

const redirectToCorrectPath = (id: any) => ({
  redirect: {
    permanent: false,
    destination: validID(id) ? `/contents/${id}` : "/",
  },
})

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({
    AuthUser,
    res,
    query,
  }): Promise<GetServerSidePropsResult<Props>> => {
    let response: UnPromisify<ReturnType<typeof fetchVideo>>
    const keys = Object.keys(query)
    if (!(validQueryKey(keys) && validQueryValueType(query))) {
      return redirectToCorrectPath(query[idKey])
    }
    const validedQuery: Query = { ...(query as any) }
    try {
      response = await fetchVideo(validedQuery.contentID)
    } catch {
      return {
        notFound: true,
      }
    }
    if (validedQuery.edit && response.content.owner !== AuthUser.id) {
      return redirectToCorrectPath(validedQuery.contentID)
    }
    if (!response.isPublished && response.content.owner !== AuthUser.id)
      return {
        notFound: true,
      }
    if (!response.isPublished) {
      const expiration = dayjs().add(1, "day").unix()
      await setCDNCookie(res, validedQuery.contentID, expiration)
    }
    return {
      props: {
        edit: !!validedQuery.edit,
        video: response.content,
      },
    }
  }
)

const EditContent = dynamic(() => import("~/components/editcontent"))

const Page: NextPage<Props> = ({ video, edit }) => {
  const uid = useRecoilValue(auth.selector.uid)
  const router = useRouter()
  const clicked = useCallback(() => {
    if (!video) {
      router.replace({ pathname: router.pathname })
    } else {
      router.replace("/")
    }
  }, [])
  const visible = useMemo(
    () => !!edit && !!uid && video.owner === uid,
    [uid, edit, video.owner]
  )
  return (
    <>
      <Header />
      <main>
        <Template video={video} />
        {
          <Modal visible={visible} onClickBackground={clicked}>
            <EditContent isVisible={visible} {...video} />
          </Modal>
        }
      </main>
    </>
  )
}

export default withAuthUser()(Page)
