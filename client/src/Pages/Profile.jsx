import { useEffect, useState } from "react";
import { Box, Container, CssBaseline, Grid, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
//import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';
const defaultTheme = createTheme();
function Profile() {
    const {getProfile, user}=useAuth();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        getProfile();
        //console.log(user);
        //console.log(getProfile().user());
      }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <AccountCircleIcon sx={{marginBottom: "20px", fontSize: "50px"}} />
          <Typography component="h1" variant="h5" mb={2}>
            Información de Perfil
          </Typography>
          
          <Box maxWidth="md">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12}>
              <Box>
              <Typography sx={{display: "inline", textAlign: "left"}}>Nombre y Apellido:</Typography>
                <Typography variant="body2" sx={{ fontSize: '17px', textAlign: "right"}}>
                {user.name}
                </Typography>
              </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
              <Box>
              <Typography sx={{display: "inline", textAlign: "left"}}>Nombre de Usuario:</Typography>
                <Typography variant="body2" sx={{ fontSize: '17px', textAlign: "right"}}>
                {user.username}
                </Typography>
              </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
              <Box>
              <Typography sx={{display: "inline", textAlign: "left"}}>Correo:</Typography>
                <Typography variant="body2" sx={{ fontSize: '17px', textAlign: "right"}}>
                {user.email}
                </Typography>
              </Box>
              </Grid>
              <Grid item xs={12} sm={12}>
              <Box>
                {"id de la cuenta: "}
                <Typography variant="body2" sx={{ fontSize: '17px', textAlign: "right"}}>
                {user.id}
                </Typography>
              </Box>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Profile;