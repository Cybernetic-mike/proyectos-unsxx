import React, { useState, useEffect } from "react";
import DownloadButton from "../Components/DownloadButton";
import axios from "../api/axios";
import { Button } from "reactstrap";
import { Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const defaultTheme = createTheme();

function BackupFiles() {
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
        //setFiles(response.data);
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

  const handleUpload = () => {
    const formData = new FormData();
    
    for (let i = 0; i < selectFiles.length; i++) {
      formData.append('uploadPDF', selectFiles[i]);
      console.log(selectFiles[i]);
    }
    

    fetch('https://proyectos-unsxx.site/api/uploadPDF', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // No se requieren acciones adicionales en el frontend
      })
      .catch((error) => {
        console.error('Error al subir el archivo:', error);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="80%">
        <CssBaseline />

        <Button onClick={handleDownload}>Cargar Lista de archivos</Button>
        <Box display={loading}>
          <ul>
            {files.map((file) => (
              <li key={file}>{file}</li>
            ))}
          </ul>
        </Box>
        <DownloadButton />
        <div>
      <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir PDF</button>
    </div>
        
        
      </Container>
    </ThemeProvider>
  );
}

export default BackupFiles;
