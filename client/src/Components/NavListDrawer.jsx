import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import ArticleIcon from "@mui/icons-material/Article";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";
function NavListDrawer({ NavLinks, setOpen }) {
  const { isAuthenticated, logout } = useAuth();

  const [abrir, setAbrir] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setAbrir((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setAbrir(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setAbrir(false);
    } else if (event.key === "Escape") {
      setAbrir(false);
    }
  }

  const prevOpen = React.useRef(abrir);
  React.useEffect(() => {
    if (prevOpen.current === true && abrir === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = abrir;
  }, [abrir]);

  const { getProfile, user } = useAuth();
  useEffect(() => {
    //getProfile();
    console.log(user);
    //console.log(getProfile().user());
  }, []);
  return (
    <Box sx={{ width: 250 }}>
      <Divider />
      <nav>
        <List>
          {isAuthenticated ? (
            <>
              <ListItem disablePadding key="Inicio">
                <ListItemButton
                  component={NavLinks}
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <MenuIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Salir">
                <ListItemButton
                  component={NavLinks}
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <LogoutIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Salir</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Registrar">
                <ListItemButton
                  component={NavLinks}
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <AppRegistrationIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Registrar</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Nuevo Autor">
                <ListItemButton
                  component={NavLinks}
                  to="/authorpage"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <AppRegistrationIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Nuevo Autor</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Nuevo Proyecto">
                <ListItemButton
                  component={NavLinks}
                  to="/proyects"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <FileOpenIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Nuevo Proyecto</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Proyectos">
                <ListItemButton
                  component={NavLinks}
                  to="/filepage"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <ArticleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Proyectos</ListItemText>
                </ListItemButton>
              </ListItem>

              <Divider sx={{ background: "white", borderTop: "1px double" }} />

              <Typography align="center">
                <AccountCircleIcon />
                {user.username}
              </Typography>
              <ListItem disablePadding key="Nuevo Autor">
                <ListItemButton
                  component={NavLinks}
                  to="/profile"
                  onClick={() => setOpen(false)}
                >
                  <ListItemText>Mi perfil</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Nuevo Proyecto">
                <ListItemButton
                  component={NavLinks}
                  to="/register"
                  onClick={() => setOpen(false)}
                >
                  <ListItemText>Nuevo Administrador</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Nuevo Proyecto">
                <ListItemButton
                  component={NavLinks}
                  to="/reports"
                  onClick={() => setOpen(false)}
                >
                  <ListItemText>Reportes</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Proyectos">
                <ListItemButton
                  key="Salir"
                  component={NavLink}
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  <ListItemText>Salir</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disablePadding key="Inicio">
                <ListItemButton
                  component={NavLinks}
                  to="/"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <MenuIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Inicio</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Ingresar">
                <ListItemButton
                  component={NavLinks}
                  to="/login"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <LoginIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Ingresar</ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding key="Mostrar Proyectos">
                <ListItemButton
                  component={NavLinks}
                  to="/filepage"
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon>
                    <ArticleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText>Proyectos</ListItemText>
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </nav>
    </Box>
  );
}
export default NavListDrawer;
