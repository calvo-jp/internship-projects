import Layout from "components/Layout";
import { useSession } from "next-auth/react";
import Head from "next/head";

const Account = () => {
  const { status, data } = useSession({ required: true });

  if (status === "loading") return null;
  if (!data) return null;

  return (
    <>
      <Head>
        <title>NextJS Auth | {data.user.name}</title>
      </Head>

      <Layout></Layout>
    </>
  );
};

export default Account;
