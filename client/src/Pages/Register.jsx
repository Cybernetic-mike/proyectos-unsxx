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
  const [checked, setChecked] = React.useState(false);
  const [noti, setNoti] = React.useState(false);
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
    //console.log(register);
    signup(values);
  });
  const handleChange = (event) => {
    setChecked(event.target.checked);
    if (checked) {
      setNoti(true);
    } else setNoti(false);

    console.log("noti");
  };

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
          <Box sx={{ color: "red" }}>
            {registerErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </Box>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre y Apellido"
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
                    errors.username && "Nombre de usuario es requerido"
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
                <div>
                  <Checkbox
                    {...register("notification", { required: false })}
                    defaultChecked
                  />
                </div>
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
