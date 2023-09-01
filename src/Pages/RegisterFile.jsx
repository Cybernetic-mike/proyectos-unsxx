import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import PublishIcon from "@mui/icons-material/Publish";
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { Dropzone, FileMosaic } from "@files-ui/react";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const defaultTheme = createTheme();

export default function RegisterFile() {

  //Acordeones
  const [area, setArea] = React.useState('');
  const handleChange = (event) => {
    setArea(event.target.value);
  };


  const { register, handleSubmit, formState:{errors}} = useForm();
  const [files, setFiles] = React.useState([]);
  const { createTask, errors: proyectErrors} = useTasks();

  const onSubmit = handleSubmit(async (data) => {
    //console.log("Archivo subido");

    const formData = new FormData();

    // append files to formData
    for (const key in data) {
      formData.append(key, data[key]);
    }

    files.forEach((file) => {
      formData.append("file", file.file);
    });


    createTask(formData);
  });


  const updateFiles = (incommingFiles) => {
    //do something with the files
    console.log("Informacion del archivo", incommingFiles);
    setFiles(incommingFiles);
    //even your own upload implementation
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  const [file, setFile] = useState();
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="80%">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PublishIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro de nuevo Proyecto
          </Typography>
          <Box sx={{color:"red"}}>
            {proyectErrors.map((error, i) => (
              <div key={i}>{error}</div>
            ))}
          </Box>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid container spacing={2} xs={12} sm={3} sx={{ mr: 4, mb: 4 }}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="registration"
                    name="registration"
                    required
                    fullWidth
                    id="registration"
                    label="Matrícula"
                    autoFocus
                    {...register("registration", { required: true })}
                    helperText={errors.registration && "Matricula Requerida"}
                    error={errors.registration ? true : false}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} xs={12} sm={6}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    name="title"
                    label="Título del Proyecto"
                    type="title"
                    id="title"
                    autoComplete="title"
                    {...register("title", { required: true })}
                    helperText={errors.title && "Titulo Obligatorio"}
                  error={errors.title ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="summary"
                    label="Resumen"
                    name="summary"
                    autoComplete="summary"
                    multiline
                    rows={4}
                    {...register("summary", { required: true })}
                    helperText={errors.summary && "Resumen Obligatorio"}
                    error={errors.summary ? true : false}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Dropzone
                    required
                    onChange={updateFiles}
                    value={files}
                    accept=".pdf"
                    maxFiles={1}
                    label="Arrastre o eliga el archivo PDF"
                    footerConfig={{
                      customMessage: "Solo se aceptan archivos en formato .PDF",
                    }}
                    headerConfig={{
                      customHeader: <></>,
                    }}
                  >
                    {files.map((file) => (
                      <FileMosaic
                        key={file.id}
                        {...file}
                        onDelete={removeFile}
                        info
                      />
                    ))}
                  </Dropzone>
                </Grid>
                <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar Proyecto
            </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
