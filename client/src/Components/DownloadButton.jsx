import React, { useEffect, useState } from 'react';
import axios from "../api/axios";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const defaultTheme = createTheme();

function DownloadButton() {

  const handleDownload = () => {
    axios.get('/download/archivo.zip', { responseType: 'blob' })
      .then((response) => {
        // Crea un enlace de descarga en el navegador y haz clic en él
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'copia-de-seguridad-proyectos.zip');
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error al descargar el archivo:', error);
      });
      //window.location.href = '/';
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="80%">
        <CssBaseline />
    <Button variant="contained" onClick={handleDownload}>Descargar </Button>
    </Container>
    </ThemeProvider>
  );
}

export default DownloadButton;