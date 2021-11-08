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
import { generateCDNCookies } from "~/modules/storagecookie"
import Header from "~/components/header"
import dynamic from "next/dynamic"
import Modal from "~/components/modal"
import { useRecoilValue } from "recoil"
import auth from "~/stores/auth"
import { useRouter } from "next/router"
import { ServerResponse } from "http"
import { useCallback, useMemo } from "react"

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

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({
    AuthUser,
    res,
    query,
  }): Promise<GetServerSidePropsResult<Props>> => {
    let content: SerializableVideo
    const id = query.contentID
    if (!(typeof id === "string" && id !== "video")) return { notFound: true }
    try {
      content = (await api(id)).content
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
          destination: "/",
        },
      }
    }
    await setCDNCookie(res, id, dayjs().add(1, "day").unix())
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
