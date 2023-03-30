import Head from "next/head";
import Loader from "@components/Loader";
import { Roles } from "@typedefs/roles";

export default function AgentForm() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
    </>
  );
}

AgentForm.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
