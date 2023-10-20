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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { useAuthors } from "../context/AuthorsContext";

import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

//Validar campos

const defaultTheme = createTheme();
function RegisterAuthor() {
  const [selectedArea, setSelectedArea] = useState(['']);
  const [careerOptions, setCareerOptions] = useState([""]);
  const [careerSalud, setCareerSalud]=useState(["BIOQUIMICA", "ODONTOLOGIA", "ENFERMERIA", "MEDICINA", "LABORATORIO CLINICO"]);
  const [careerSociales, setCareerSociales]=useState(["CIENCIAS DE LA EDUCACION", "CONTADURIA PUBLICA", "DERECHO", "COMUNICACION SOCIAL"]);
  const [careerTecnologia, setCareerTecnologia]=useState(["CIVIL", "AGRONIMIA", "INFORMATICA", "MECANICA AUTOMOTRIZ", "MINAS TOPOLOGIA", "ELECTROMECANICA"])
  const [careers, setCareers]=useState(['']);
  const [selectedNumber, setSelectedNumber] = useState('');

  const navigate = useNavigate();

  const { register, handleSubmit, formState:{errors} } = useForm();
  const { createAuthor, errors: registerErrors } = useAuthors();

  const onSubmit = handleSubmit(async(values) => {
    
    console.log(values)
    createAuthor(values);
    //navigate("/proyects");
  });

  /*Lista deplegable*/
  const handleAreaChange = (event) => {
    const newType = event.target.value;
    setSelectedArea(newType);
    console.log(newType)

    if (newType === "SALUD") {
      
      //setSelectedArea("salud");      
      setCareerOptions(["BIOQUIMICA", "ODONTOLOGIA", "ENFERMERIA", "MEDICINA", "LABORATORIO CLINICO"]);
      setCareers(careerSalud);  
      console.log(newType)

    } else if (newType === "SOCIALES") {
      
      //setSelectedArea("sociales");
      
      setCareerOptions(["CIENCIAS DE LA EDUCACION", "CONTADURIA PUBLICA", "DERECHO", "COMUNICACION SOCIAL"]);
      setCareers(careerSociales);      
      console.log(newType)
    } else if (newType === "TECNOLOGIA") {
      
      //setSelectedArea("tecnologia");
      
      setCareerOptions(["CIVIL", "AGRONIMIA", "INFORMATICA", "MECANICA AUTOMOTRIZ", "MINAS TOPOLOGIA", "ELECTROMECANICA"]);
      setCareers(careerTecnologia); 
      console.log(newType)
    }
  };

  const handleCareerChange=(event)=>{
    const newType= event.target.value;
    setCareerOptions(newType);
    console.log(careerOptions);
  }
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
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de nuevo Investigador
          </Typography>
          <Box sx={{color:"red"}}>
            {registerErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </Box>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="registration"
                  required
                  fullWidth
                  id="registration"
                  label="C.I./R.U.º"
                  {...register("registration", { required: true })}
                  autoFocus
                  helperText={errors.registration && "Nombre es requerido"}
                  error={errors.registration ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="Nombres"
                  name="firstname"
                  {...register("firstname", { required: true })}
                  helperText={errors.firstname && "Nombre es requerido"}
                  error={errors.firstname ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Apellidos"
                  name="lastname"
                  {...register("lastname", { required: true })}
                  helperText={errors.lastname && "Nombre es requerido"}
                  error={errors.lastname ? true : false}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth
                >
                  <InputLabel id="area">Area</InputLabel>
                  <Select
                    //id="area"
                      
                    value={selectedArea}
                    label="Area"
                    //error={errors.area ? true : false} 
                    {...register("area", { required: true })}
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
                  <FormControl fullWidth>
                  <InputLabel id="career">Carrera</InputLabel>
                  <Select
                    value={careerOptions}
                    label="Carrera"
                    {...register("career", { required: true })}
                    onChange={handleCareerChange}
                    required
                    
                  >
                    {careers.map((carrera) => (
                      <MenuItem key={carrera} value={carrera}>{carrera}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  label="Correo Electronico"
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register("email", { required: true })}
                  helperText={errors.email && "Nombre es requerido"}
                  error={errors.email ? true : false}
                />
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
export default RegisterAuthor;
