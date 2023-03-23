import Loader from "../../component/Loader";
import Dashboard from "../../container/Dashboard";
import { Roles } from "../../typedefs/roles";

export default function DBoard() {
  return <Dashboard />;
}

DBoard.auth = {
  role: Roles.ADMIN,
  loading: <Loader />,
  unauthorized: "/",
};
