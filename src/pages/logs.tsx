import { getSession } from "next-auth/react";
import { LogsContainer } from "../../container/Logs";
import { API } from "../../lib/api";

export default function Logs({ data }: any) {
  const { data: logs } = data;
  return <LogsContainer data={logs} />;
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const { data } = await API.get("/api/logs", {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
      params: { limit: 100, page: 0, search: "" },
    });
    return {
      props: {
        data,
      },
    };
  } catch (e) {
    return {
      props: {
        data: { data: [] },
      },
    };
  }
}
