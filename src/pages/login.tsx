import { NextPage } from "next"
import Template from "~/templates/signin"
import {
  withAuthUserTokenSSR,
  withAuthUser,
  AuthAction,
} from "next-firebase-auth"
import "firebase/auth"
import { useRecoilValue } from "recoil"
import store from "~/stores/auth"

const Page: NextPage<{}> = () => {
  const isSubscribed = useRecoilValue(store.selector.isSubscribed)
  return (
    <>
      <main>{isSubscribed && <Template />}</main>
      <style jsx>
        {`
          main {
            display: flex;
            align-items: flex-start;
          }
          @media screen and (min-width: 450px) {
            main {
              align-items: center;
              justify-content: center;
              min-height: 100vh;
            }
          }
        `}
      </style>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})()

export default withAuthUser({ whenAuthed: AuthAction.REDIRECT_TO_APP })(Page)
