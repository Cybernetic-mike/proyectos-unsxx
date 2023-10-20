import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import { useForm } from "react-hook-form";
//import { useCarreras } from "../context/CarrerasContext";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

//Validar campos

const defaultTheme = createTheme();
function RegisterCarrera() {
  const [selectedArea, setSelectedArea] = useState([""]);

  //const navigate = useNavigate();

  const {
    register,
    handleSubmit
  } = useForm();
  //const { createAuthor, errors: registerErrors } = useCarreras();

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    //createAuthor(values);
  });

  /*Lista deplegable*/
  const handleAreaChange = (event) => {
    const newType = event.target.value;
    setSelectedArea(newType);
    console.log(newType);
  };
  
  const [inputValue1, setInputValue1] = useState("");
  const handleInputChange1 = (event) => {
    const value = event.target.value;
    const replacedValue = value.replace(/ /g, "-");
    const minusculas = replacedValue.toLowerCase();
    setInputValue1(minusculas);
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
            paddingBottom: "150px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de nueva Carrera
          </Typography>
          <Box sx={{ color: "red" }}>
          </Box>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="categori">Area</InputLabel>
                  <Select
                    //id="area"

                    value={selectedArea}
                    label="Area"
                    //error={errors.area ? true : false}
                    {...register("categori", { required: true })}
                    onChange={handleAreaChange}
                    required
                    //helperText={errors.area && "Nombre es requerido"}
                  >
                    <MenuItem value="SALUD">SALUD</MenuItem>
                    <MenuItem value="SOCIALES">SOCIALES</MenuItem>
                    <MenuItem value="TECNOLOGIA">TECNOLOGIA</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="carrera"
                  label="Carrera"
                  name="carrera"
                  onKeyUp={handleInputChange1}
                  {...register("name", { required: true })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                
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
export default RegisterCarrera;
