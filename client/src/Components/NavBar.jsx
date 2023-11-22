import {
  AppBar,
  Box,
  Button,
  ClickAwayListener,
  Drawer,
  Grow,
  IconButton,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Slide,
  TextField,
  Toolbar,
  Typography,
  alpha,
  useScrollTrigger,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import React, {useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import escudo from "../images/unsxx.png";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import SearchIcon from "@mui/icons-material/Search";
import zIndex from "@mui/material/styles/zIndex";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Img = styled("img")({
  width: 50,
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
});
/*Funcion para que quede fijo el titulo*/
function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};
/************************************** */
function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

//Estilos del buscador
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function NavBar({ navArrayLinks, navArrayLinksAdmin, props }) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
  
  const {getProfile, user}=useAuth();
    useEffect(() => {
        //getProfile();
        console.log(user);
        //console.log(getProfile().user());
      }, []);

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          position="sticky"
          sx={{
            background: "linear-gradient(45deg, red 10%, #002BFF 95%)",
            padding: "5px",
          }}
        >
          <Toolbar>
            <Img src={escudo} alt="Escudo UNSXX" />
            <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: "10px" }}>
              PROYECTOS UNSXX
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {isAuthenticated ? (
                <>
                  <Button
                    color="inherit"
                    key="Inicio"
                    component={NavLink}
                    to="/"
                  >
                    Inicio
                  </Button>
                  
                  <Button
                    color="inherit"
                    key="Nuevo Autor"
                    component={NavLink}
                    to="/authorpage"
                  >
                    Nuevo Autor
                  </Button>
                  <Button
                    color="inherit"
                    key="Nuevo Proyecto"
                    component={NavLink}
                    to="/proyects"
                  >
                    Nuevo Proyecto
                  </Button>
                  <Button
                    color="inherit"
                    key="Mostrar Proyecto"
                    component={NavLink}
                    to="/filepage"
                  >
                    Proyectos
                  </Button>
                  <Box sx={{ display: "inline" }}>
                    <Button
                      color="inherit"
                      ref={anchorRef}
                      id="composition-button"
                      aria-controls={abrir ? "composition-menu" : undefined}
                      aria-expanded={abrir ? "true" : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}
                    >
                    <AccountCircleIcon/>
                    {user.username}
                    </Button>
                    <Popper
                      open={abrir}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      placement="bottom-start"
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom-start"
                                ? "right bottom"
                                : "right top",
                          }}
                        >
                          <Paper sx={{ background: "white"}}>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList
                                autoFocusItem={abrir}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                              >
                                <MenuItem
                                  key="Profile"
                                  component={NavLink}
                                  to="/profile"
                                  onClick={handleClose}
                                >
                                <Typography align="left" pl={12}>Mi Perfil</Typography>
                                  
                                </MenuItem>
                                <MenuItem
                                  key="Registrar"
                                  component={NavLink}
                                  to="/register"
                                  onClick={handleClose}
                                >
                                  Nuevo Administrador
                                </MenuItem>
                                <MenuItem
                                  key="Backup"
                                  component={NavLink}
                                  to="/backupfiles"
                                  onClick={handleClose}
                                >
                                  Copia de seguridad
                                </MenuItem>
                                <MenuItem
                                  key="Carrera"
                                  component={NavLink}
                                  to="/registercarrera"
                                  onClick={handleClose}
                                >
                                  Nueva Carrera
                                </MenuItem>
                                <MenuItem
                                  key="Carrera"
                                  component={NavLink}
                                  to="/reports"
                                  onClick={handleClose}
                                >
                                  Reportes
                                </MenuItem>
                                <MenuItem
                                  key="Salir"
                                  component={NavLink}
                                  to="/"
                                  onClick={() => {
                                    logout();
                                  }}
                                >
                                  <Typography align="left" pl={15}>Salir</Typography>
                                </MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    key="Inicio"
                    component={NavLink}
                    to="/"
                  >
                    Inicio
                  </Button>
                  <Button
                    color="inherit"
                    key="Ingresar"
                    component={NavLink}
                    to="/login"
                  >
                    Ingresar
                  </Button>
                  <Button
                    color="inherit"
                    key="Mostrar Proyectos"
                    component={NavLink}
                    to="/filepage"
                  >
                    Proyectos
                  </Button>
                </>
              )}
            </Box>
            <IconButton
              color="inherit"
              size="large"
              onClick={() => setOpen(true)}
              sx={{ display: { xs: "flex", sm: "none" } }}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Box>
        <HideOnScroll {...props}>
          <AppBar
            sx={{
              background: "rgb(0, 43, 255)",
              paddingTop: "76px",
              zIndex: "2",
            }}
          >
            <Toolbar>
              <Typography sx={{ flexGrow: 1 }} />
              {/* Search input */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/filepage?search=${search}`);
                }}
              >
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Buscar..."
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Search>
              </form>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
      </Box>
      <Drawer
        open={open}
        anchor="right"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer
          navArrayLinks={navArrayLinks}
          NavLinks={NavLink}
          setOpen={setOpen}
        />
      </Drawer>
    </>
  );
}
export default NavBar;
