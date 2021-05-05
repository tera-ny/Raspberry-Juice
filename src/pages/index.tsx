import { NextPage, GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<{}> = async () => {
  return { props: {} };
};

const Page: NextPage<{}> = () => {
  return (
    <>
      <main>
      </main>
    </>
  );
};

export default Page;
