import { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";

const defaultTheme = createTheme();

function FilePage() {
  const {
    formState: { errors },
  } = useForm();
  const { getTasks, tasks, fileViwer } = useTasks();
  const { getAuthors, authors } = useAuthors();
  const [urlFile, setUrlFile] = useState();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getTasks({
      search: searchParams.get("search"),
      carrera: searchParams.get("carrera"),
    });
  }, [searchParams.get("carrera"), searchParams.get("search")]);

  useEffect(() => {
    getAuthors();
    //console.log("authors")
  }, []);

  const navigate = useNavigate();
  const onClick = (taskFile) => {
    setUrlFile(taskFile);
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
                m: "10px",
                background: "white",
                boxShadow: "3px 3px 8px",
              }}
            >
              <CardContent>
                <Typography sx={{ mb: 1.5, textAlign: "center" }}>
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
                  sx={{fontSize: 14, mb: 1.5, display: "inline" }}
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
                <Typography sx={{fontSize: 14, mb: 1.5, textAlign:'center' }} color="text.secondary">
                  {"RESUMEN: "}
                </Typography>
                <Typography variant="body2">{task.summary}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  defaultValue={task.file}
                  onClick={() => onClick(task.file)}
                >
                  Leer mas...
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default FilePage;
