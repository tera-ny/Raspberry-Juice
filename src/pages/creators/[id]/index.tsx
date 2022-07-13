import { GetServerSideProps, NextPage } from "next";
import Template from "~/templates/creator";
import Header from "~/components/header";
import fetchContents from "~/modules/api/videos";

import { Props } from "~/templates/creator";
import { verifyAuthCookie } from "~/modules/auth/login";

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  query,
}) => {
  try {
    if (typeof query.id !== "string") {
      return {
        notFound: true,
      };
    } else {
      const targetID = query.id;
      const response = await fetchContents(targetID);
      const decoded = await verifyAuthCookie(req);
      return {
        props: {
          isOwner: decoded !== null && targetID === decoded.uid,
          modal: query.m === "true",
          contents: response.contents,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

const Page: NextPage<Props> = (props) => {
  return (
    <>
      <Header />
      <main>
        <Template {...props} />
      </main>
    </>
  );
};

export default Page;
