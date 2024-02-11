import { useEffect, useState, FC, ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Copyright from "@components/Copyright";
import { SideDrawer } from "@components/Drawer";
import { useSession } from "next-auth/react";

interface IDrawerContainer {
  children: ReactNode;
}

const DrawerContainer: FC<IDrawerContainer> = ({ children }) => {
  const [title, setTitle] = useState(document.title);
  const {data: session, status} = useSession({required: true})

  useEffect(() => {
    if (document.title) setTitle(document.title);
  }, [children]);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('parent daw to', session, status)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawer title={title} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Toolbar />
        {children}
      </Box>
      <Copyright />
    </Box>
  );
};

export default DrawerContainer;
