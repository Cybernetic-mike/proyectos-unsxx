import React, { useState, useEffect } from "react";
import DownloadButton from "../Components/DownloadButton";
import axios from "../api/axios";
import Button from "@mui/material/Button";
import { Box, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Input } from "reactstrap";

const defaultTheme = createTheme();

function Reports() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState("none");
  const [archivos, setArchivos] = useState([]);
  const [selectFiles, setSelectFiles] = useState([]);

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener la lista de archivos
    axios
      .get("/uploads")
      .then((response) => {
        setFiles(response.data.files);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de archivos:", error);
      });
  }, []);

  const handleDownload = () => {
    setLoading("auto");
    // Enviar una solicitud POST al servidor para descargar los archivos
    axios
      .post("/uploads", files)
      .then((response) => {
        console.log(response.data);
        // setFiles(response.data);
      })
      .catch((error) => {
        console.error("Error al iniciar la descarga:", error);
      });
    // Redirige al usuario a la ruta de descarga en el servidor
  };

  const handleFileChange = (event) => {
    const temp = event.target.files;
    setSelectFiles([...archivos, ...temp]); // Agregar nuevos archivos a la lista existente
    console.log(selectFiles);
  };

  const handleReport = async () => {
    const link = document.createElement("a");
    link.href = `/api/reporte`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleUpload = () => {
    const formData = new FormData();

    for (let i = 0; i < selectFiles.length; i++) {
      formData.append("uploadPDF", selectFiles[i]);
      console.log(selectFiles[i]);
    }

    fetch("http://localhost:4000/uploads", {
      //fetch("/api/uploads", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((data) => {
        console.log(data);
        // No se requieren acciones adicionales en el frontend
      })
      .catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="80%">
        <CssBaseline />
        <Grid container spacing={1}>
          <Grid item xs={6} sm={12} md={6}>
            <Box p={8}>
              Reportes
              <Button onClick={() => handleReport()}>Generar Reporte</Button>
            </Box>
          </Grid>
          <Grid item xs={6} sm={12} md={6}>
            <Box p={8}></Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Reports;
