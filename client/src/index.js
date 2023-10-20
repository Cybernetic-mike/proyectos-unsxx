import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";

import { FacebookProvider } from 'react-facebook'

const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#0043d6",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#2ec5d3",
    },
    background: {
      default: "#FFFFFF",
      paper: "#bbbbbb",
    },
    success: {
      main: "#676767",
    },
    text: {
      primary: "#000000",
    },
  },
});
root.render(
  <React.StrictMode>
  <FacebookProvider appId="644428504486491">
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
    </FacebookProvider>
  </React.StrictMode>
);
reportWebVitals();
