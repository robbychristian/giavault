import Login from "@containers/Login";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Login />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
