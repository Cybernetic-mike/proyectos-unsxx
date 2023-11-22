import React, { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext";
import { useAuthors } from "../context/AuthorsContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//import { TextField } from "@mui/material";
import { useSearchParams, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";

const defaultTheme = createTheme();

function FilePage() {
  const [project, setProject] = useState(null);
  const [maxCampoEntero, setMaxCampoEntero] = useState(null);
  const [value, setValue] = React.useState(0);
  const {
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { getTasks, tasks, fileViwer, updateTask } = useTasks();
  const { getAuthors, authors } = useAuthors();
  const [urlFile, setUrlFile] = useState();
  const [searchParams] = useSearchParams();
  const params = useParams();

  useEffect(() => {
    getTasks({
      search: searchParams.get("search"),

    });
  }, [ searchParams.get("search")]);

  useEffect(() => {
    getAuthors();
    //console.log("authors")
  }, []);

  const navigate = useNavigate();
  const onClick = (taskFile, taskId, taskVisits) => {
    setUrlFile(taskFile);
    console.log(urlFile);
    //if(params.id){
    const visitas = {
      visits: taskVisits + 1,
    };
    updateTask(taskId, visitas);
    console.log(visitas);
    //}
    navigate(`/viewfile?urlFile=${taskFile}`);
  };

  if (tasks.length === 0) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <Box>
            <Card
              sx={{
                minWidth: 275,
                m: "10px",
                background: "white",
                boxShadow: "3px 3px 8px",
              }}
            >
              <CardContent>
                <Typography sx={{ mb: 1.5, textAlign: "center" }}>
                  No se encontraron resultados
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <Box>
          {tasks.map((task) => (
            <Card
              key={task._id}
              sx={{
                minWidth: 275,
                m: "3%",
                background: "white",
                boxShadow: "3px 3px 8px",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ mb: 1.5, textAlign: "center", fontWeight: "bold" }}
                >
                  {task.title}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, display: "inline" }}
                  color="text.secondary"
                  gutterBottom
                >
                  {"CARRERA: "}
                </Typography>
                <Typography
                  variant="h5"
                  component="div"
                  sx={{ fontSize: 14, display: "inline" }}
                >
                  {authors.map((autor) => (
                    <Typography
                      key={autor._id}
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 14, display: "inline" }}
                    >
                      {task.registration === autor.registration
                        ? `${autor.career}`
                        : ""}
                    </Typography>
                  ))}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, mb: 1.5, display: "inline" }}
                  color="text.secondary"
                >
                  <br />
                  {"AUTOR: "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: 14, display: "inline" }}
                >
                  {authors.map((autor) => (
                    <Typography
                      key={autor._id}
                      variant="h5"
                      component="div"
                      sx={{ fontSize: 14, display: "inline" }}
                    >
                      {task.registration === autor.registration
                        ? `${autor.firstname} ${autor.lastname}`
                        : ""}
                    </Typography>
                  ))}
                </Typography>
                <Typography variant="body2">{task.lastname}</Typography>
                <Typography
                  sx={{ fontSize: 14, mb: 1.5, textAlign: "center" }}
                  color="text.secondary"
                >
                  {"RESUMEN: "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ height: "75px", overflow: "hidden" }}
                >
                  {task.summary}
                </Typography>
              </CardContent>
              <CardActions sx={{display: "inline"}}>
                <Box sx={{display: "inline"}}>
                  <Button
                    size="small"
                    defaultValue={task.file}
                    onClick={() => onClick(task.file, task._id, task.visits)}
                    
                  >
                    Ver contenido...
                  </Button>
                </Box>
                <Box sx={{textAlign: "right", paddingRight: "2%"}}>
                  <Typography component="legend">
                    Popularidad{" "}
                    {task.visits > value ? setValue(task.visits) : " "}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={
                      task.visits < value / 5
                        ? 1
                        : task.visits < (value / 5) * 2
                        ? 2
                        : task.visits < (value / 5) * 3
                        ? 3
                        : task.visits < (value / 5) * 4
                        ? 4
                        : 5
                    }
                    readOnly
                    precision={0.5}
                  />
                </Box>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default FilePage;
