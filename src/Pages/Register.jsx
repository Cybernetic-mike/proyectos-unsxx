import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { Formik } from "formik";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//Validar campos

const defaultTheme = createTheme();
function Register() {
  //Visualizar contraseña
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  /**************************************************/

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  /*useEffect(()=>{
    if(isAuthenticated) navigate("/");
  },[isAuthenticated]);*/

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de nuevo Administrador
          </Typography>
          <Box sx={{color:"red"}}>
            {registerErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </Box>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombres"
                  {...register("name", { required: true })}
                  autoFocus
                  helperText={errors.name && "Nombre es requerido"}
                  error={errors.name ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="Nombre de Usuario"
                  name="username"
                  {...register("username", { required: true })}
                  helperText={
                    errors.username && "Nombre se usuario es requerido"
                  }
                  error={errors.username ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  //required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                  helperText={errors.email && "Correo electronico es requerido"}
                  error={errors.email ? true : false}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ width: "100%" }}
                  variant="outlined"
                  required
                  error={errors.password ? true : false}
                >
                  <InputLabel>Contraseña</InputLabel>
                  <OutlinedInput
                    //required
                    fullWidth
                    name="password"
                    id="password"
                    htmlFor="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                    {...register("password", { required: true })}
                    error={errors.password ? true : false}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="Acepto recibir notificaciones en mi correo."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Register;

/**
 * El objetivo de tu proyecto es crear un repositorio de proyectos similar al repositorio de la UMSA, donde los usuarios puedan acceder a diferentes proyectos y tesis de grado de las diferentes carreras. Estos proyectos estarán disponibles en formato PDF y los usuarios podrán consultarlos sin necesidad de registro.

Hasta el momento, has realizado las siguientes tareas:

Diseño de la interfaz: Has creado el diseño de la interfaz principal utilizando Material-UI, una biblioteca de componentes de interfaz de usuario para React. Has diseñado componentes como Home, NavBar, Search, Login, Register, RegisterFile, Aside y Footer para construir la interfaz del repositorio.

Implementación del backend: Has utilizado Node.js y Express para crear el backend de tu aplicación. Estos frameworks te permiten manejar las solicitudes HTTP, gestionar la lógica de negocio y establecer la conexión con la base de datos.

Conexión con MongoDB: Has establecido la conexión con MongoDB, una base de datos NoSQL, para almacenar la información de los proyectos y otros datos relevantes. MongoDB es una opción popular para proyectos web debido a su flexibilidad y escalabilidad.

Funcionalidad de registro de administradores: Has trabajado en la implementación de la funcionalidad de registro de administradores en el componente Register. Has utilizado el paquete Notistack para mostrar notificaciones al usuario, y has utilizado fetch para enviar los datos del administrador al servidor.

Sin embargo, actualmente estás enfrentando dificultades para limpiar los campos del formulario de registro después de enviarlo. En nuestra próxima sesión, me aseguraré de ayudarte a resolver este problema y asegurarnos de que la funcionalidad de registro funcione correctamente.

Si hay algún otro detalle que consideres relevante o cualquier otra pregunta que tengas, no dudes en hacerla.
*/
