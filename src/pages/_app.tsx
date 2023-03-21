// import "@/styles/globals.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import type { AppProps } from "next/app";
const theme = createTheme({
  palette: {
    primary: {
      main: "#f9b17a",
    },
    background: {
      default: "#2d3250",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
