import { Box, Container, CssBaseline, Fab } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";
import FacebookShareButton from "../Components/FacebookShareButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
//import linkWhatsapp from "https://api.whatsapp.com/send?text=";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const defaultTheme = createTheme({
  palette: {

    secondary: {
      main: "#2B9F56",
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
function ViewFile() {
  const location = useLocation();
  const urlFile = new URLSearchParams(location.search).get("urlFile");
  const [numPages, setNumPages] = useState(null);

  const pdfUrl = urlFile;
  console.log(pdfUrl);
  const [url, setUrl]=useState(pdfUrl);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const shareOnFacebook = () => {
    window.FB.ui({
      method: 'share',
      href: "https://proyectos-unsxx.site/viewfile?urlFile="+pdfUrl
    }, function(response){});
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box>
        <iframe src={url} width="100%" height="550"></iframe>
        </Box>
        {/*
        <Box
         
          sx={{
            marginTop: 2,
            display: "flex",
            textAlign: "left",
            height: "570px",
            width: "80%",
            paddingRight: "0",
            overflow: "auto",
            position: "relative",
          }}
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            style={{ width: "100%", height: "100%" }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div style={{ border: "3px solid black", borderRadius: "4px" }}>
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={window.innerWidth * 0.4}
                />
              </div>
            ))}
          </Document>
          
        </Box>
        */}
        <Fab
        color="secondary"
          sx={{ background: "#25D366" , color: "white" }}
          aria-label="WhatsApp"
          href={`https://api.whatsapp.com/send?text=https://proyectos-unsxx.site/viewfile?urlFile=${pdfUrl}`}
          target="blank"
        >
          <WhatsAppIcon fontSize="large" />
        </Fab>
        <Fab
        color="primary"
          sx={{ background: "#1778F2", color: "white" }}
          aria-label="Facebook"
          onClick={shareOnFacebook}
        >
          <FacebookIcon fontSize="large" />
        </Fab>
        <Fab
        color="primary"
          sx={{ background: "#00acee" , color: "white" }}
          aria-label="Twitter"
          href={`https://twitter.com/intent/tweet?text=Proyectos_UNSXX&url=https://proyectos-unsxx.site/viewfile?urlFile=${pdfUrl}&via=Proyecto&hashtags=#unsxx`}
          target="blank"
        >
          <TwitterIcon fontSize="large" />
        </Fab>        
      </Container>
    </ThemeProvider>
  );
}
export default ViewFile;
