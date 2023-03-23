import Login from "../../container/Login";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getCsrfToken, getSession } from "next-auth/react";

export default function Home() {
  return <Login />;
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);
  console.log("session", session);
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
