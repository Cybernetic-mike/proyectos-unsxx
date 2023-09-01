import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { Button, Modal } from "@mui/material";

// Importa los iconos de las redes sociales que quieras usar
import FacebookIcon from "@mui/icons-material/Facebook";
import WebIcon from "@mui/icons-material/Web";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';

import { useState } from "react";
import LicenseModal from "./Licencia";

function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Box
      sx={{ backgroundColor: "grey.200", padding: "20px", marginTop: "auto" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Enlaces</Typography>
            <Link href="/" variant="body1" display="block">
              <HomeIcon/>Inicio
            </Link>
            <Link href="/acerca-de" variant="body1" display="block">
              <InfoIcon/>Acerca de
            </Link>
            <Link
              href="http://unsxx.edu.bo/"
              variant="body1"
              display="block"
              target="_blank"
            >
              <WebIcon /> Sitio web UNSXX
            </Link>
            <Link
              href="https://www.facebook.com/UNSXX.edu.bo"
              variant="body1"
              display="block"
              target="_blank"
            >
              <FacebookIcon /> Facebook
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Contactos</Typography>
            Direccion DGI:
            <Link
              sx={{ paddingRight: "30%" }}
              href="https://goo.gl/maps/juXEkw6yzyzMMuTt8"
              variant="body1"
              display="inline"
            >
               Edificio de transparencia, segundo andar Calle
              Campero N° 36, Llallagua - Potosí - Bolivia<br/>
            </Link>
            Correo: 
            <Link
              variant="body1"
              display="inline"
            >
              dtic@unsxx.edu.bo
            </Link>
          </Grid>
          
        </Grid>
        <Typography variant="body2" align="center" sx={{ marginTop: "20px" }}>
          Copyleft &copy; {new Date().getFullYear()} Miguel Callizaya. Todos los
          derechos reservados.
          <p>
            <Link href="#" onClick={openModal}>
              Terminos y condiciones
            </Link>
          </p>
          <LicenseModal isOpen={isModalOpen} onRequestClose={closeModal} />
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
