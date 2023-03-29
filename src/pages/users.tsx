import { getSession } from "next-auth/react";
import { UserContainer } from "../../container/User";
import { API } from "../../lib/api";

export default function Users({ data }: any) {
  const { data: users } = data;
  return <UserContainer data={users} />;
}

export async function getServerSideProps(context: any) {
  try {
    const session = await getSession(context);
    const { data } = await API.get("/api/user", {
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
