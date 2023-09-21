import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TocIcon from "@mui/icons-material/Toc";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Roles } from "@typedefs/roles";
import { Divider } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PolicyIcon from "@mui/icons-material/Policy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export const MenuList = () => {
  const { data: session } = useSession({ required: true });
  console.log("Rendered User: ", session);
  switch (Number(session?.user.role)) {
    case Roles.ADMIN:
      return <Admin />;
    case Roles.AGENT:
      return <Agent />;
    default:
      return <Agent />;
  }
};

const Agent = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/insurance/form")}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Insurance Policy" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/insurance/list")}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Insurance Policy List" />
      </ListItemButton>
    </React.Fragment>
  );
};

const Admin = () => {
  const router = useRouter();
  return (
    <React.Fragment>
      <ListItemButton onClick={() => router.push("/dashboard")}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/logs")}>
        <ListItemIcon>
          <TocIcon />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/users")}>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="User Management" />
      </ListItemButton>
      <Divider />
      <ListItemButton onClick={() => router.push("/insurance/form")}>
        <ListItemIcon>
          <PolicyIcon />
        </ListItemIcon>
        <ListItemText primary="Add Insurance Policy" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/insurance/list")}>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Insurance Policy List" />
      </ListItemButton>
      <ListItemButton onClick={() => router.push("/insurance/upload")}>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Upload Policies" />
      </ListItemButton>
    </React.Fragment>
  );
};
