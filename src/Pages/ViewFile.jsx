import { Box, Container, CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useLocation } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const defaultTheme = createTheme();
function ViewFile() {
  const location = useLocation();
  const urlFile = new URLSearchParams(location.search).get("urlFile");
  const [numPages, setNumPages] = useState(null);

  const pdfUrl = `http://localhost:4000${urlFile}`;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            textAlign: "left",
            height: "550px",
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
                  width={window.innerWidth * 0.7}
                />
              </div>
            ))}
          </Document>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default ViewFile;
