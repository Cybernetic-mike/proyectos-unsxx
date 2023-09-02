import NavBar from './Components/NavBar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import RegisterFile from './Pages/RegisterFile';
import RegisterAuthor from './Pages/RegisterAuthor';
import ViewFile from './Pages/ViewFile';
import { Route, Routes } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Box, Container } from '@mui/material';
import Aside from './Components/Aside';
import Footer from './Components/Footer';
import { AuthProvider } from './context/AuthContext';

import ProtectedRoute from './Pages/ProtectedRoute';
import { TaskProvider } from './context/TasksContext';
import { AuthorProvider } from './context/AuthorsContext';

import FilePage from './Pages/FilePage';
import { useAuth } from './context/AuthContext';

const navArrayLinks=[
  {
      title: "Inicio", path:"/", icon: <MenuIcon color='success'/>
  },
  {
      title: "Ingresar", path:"/login" , icon: <InboxIcon color='success'/>
  },
  {
      title: "Registrar", path:"/register", icon: <DraftsIcon color='success'/>
  },
  {
    title: "Nuego Proyecto", path:"/proyects", icon: <DraftsIcon color='success'/>
  },
  {
    title: "Mostrar Proyectos", path:"/filepage", icon: <DraftsIcon color='success'/>
  },
  {
    title: "Nuevo Autor", path:"/authorpage", icon: <DraftsIcon color='success'/>
  },
  {
    title: "Mostrar Archivo", path:"/viewfile", icon: <DraftsIcon color='success'/>
  }
]
function App() {
  //const {isAuthenticated}= useAuth();
  return (
    <AuthProvider>
      <NavBar navArrayLinks={navArrayLinks}/>
      <Box sx={{ display: {sm: 'block', md: 'flex'}}}>
      <Container sx={{mt: 7}}>
      <TaskProvider>
      <AuthorProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/filepage' element={<FilePage/>}/>
          <Route path='/viewfile' element={<ViewFile/>}/>

          
          <Route element={<ProtectedRoute/>}>
            <Route path='/register' element={<Register/>}/>
            <Route path='/proyects' element={<RegisterFile/>}/>
            <Route path='/authorpage' element={<RegisterAuthor/>}/>
          </Route>
        </Routes>
        </AuthorProvider>
        </TaskProvider>
      </Container>
      <Aside/>
      </Box>
      
      
      <Footer/>

    </AuthProvider>
  );
}

export default App;

