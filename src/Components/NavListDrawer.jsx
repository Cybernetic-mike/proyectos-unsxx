import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
function NavListDrawer({NavLinks, setOpen}) {
    const {isAuthenticated}=useAuth();
    return(
        
        <Box sx={{width:250}}>
                <Divider/>
        <nav>
            <List>
            {
                isAuthenticated ? (<>
                    <ListItem disablePadding key="Inicio">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><MenuIcon color='success'/></ListItemIcon>
                        <ListItemText>Inicio</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Salir">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/login"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><LogoutIcon color='success'/></ListItemIcon>
                        <ListItemText>Salir</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Registrar">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/register"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><AppRegistrationIcon color='success'/></ListItemIcon>
                        <ListItemText>Registrar</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Nuevo Autor">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/authorpage"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><AppRegistrationIcon color='success'/></ListItemIcon>
                        <ListItemText>Nuevo Autor</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Nuevo Proyecto">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/proyects"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><FileOpenIcon color='success'/></ListItemIcon>
                        <ListItemText>Nuevo Proyecto</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Proyectos">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/filepage"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><ArticleIcon color='success'/></ListItemIcon>
                        <ListItemText>Proyectos</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                </>):(<>
                    <ListItem disablePadding key="Inicio">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><MenuIcon color='success'/></ListItemIcon>
                        <ListItemText>Inicio</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Ingresar">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/login"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><LoginIcon color='success'/></ListItemIcon>
                        <ListItemText>Ingresar</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding key="Mostrar Proyectos">
                    
                    <ListItemButton component={NavLinks} 
                                    to="/filepage"
                                    onClick={()=> setOpen(false)}>
                    <ListItemIcon><ArticleIcon color='success'/></ListItemIcon>
                        <ListItemText>Proyectos</ListItemText>
                        
                    </ListItemButton>
                </ListItem>
                </>)
                    
            }
            </List>
        </nav>
        </Box>
    )
}
export default NavListDrawer;