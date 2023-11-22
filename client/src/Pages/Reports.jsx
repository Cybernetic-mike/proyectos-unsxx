import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Avatar, Box, Typography } from "@mui/material";
import SummarizeIcon from '@mui/icons-material/Summarize';

const defaultTheme = createTheme();

function Reports() {
//Llama a la ruta del backend el archivo PDF
  const handleReport = async () => {
    const link = document.createElement("a");
    link.href = `/api/reporte`; // http://localhost:4000/api/reporte
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="80%">
        <CssBaseline />
            <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <SummarizeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            REPORTE GENERAL
          </Typography>
            </Box>
            <Button variant="contained"  onClick={() => handleReport()}>Generar Reporte</Button>
      </Container>
    </ThemeProvider>
  );
}

export default Reports;
