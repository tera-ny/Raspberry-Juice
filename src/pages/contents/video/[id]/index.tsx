import { NextPage } from "next"
import Auth from "~/components/auth"
import Template from "~/templates/video"

const Page: NextPage<{}> = () => {
  return (
    <>
      <main>
        <Auth>
          <Template />
        </Auth>
      </main>
    </>
  )
}

export default Page
