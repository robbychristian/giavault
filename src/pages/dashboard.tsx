import Loader from "../../component/Loader";
import Dashboard from "../../container/Dashboard";

export default function DBoard() {
  return <Dashboard />;
}

DBoard.auth = {
  role: "admin",
  loading: <Loader />,
  unauthorized: "/",
};
