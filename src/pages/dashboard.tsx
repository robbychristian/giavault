import Head from "next/head";
import Loader from "@components/Loader";
import Dashboard from "@containers/Dashboard";
import { Roles } from "@typedefs/roles";

export default function DBoard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Dashboard />
    </>
  );
}

DBoard.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
