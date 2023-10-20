import { createContext, useContext, useState } from "react";
import {
  createCarrerasRequest,
  getCarrerasRequest,
  deleteCarreraRequest,
} from "../api/carreras";
import { useNavigate } from "react-router-dom";

const CarreraContext = createContext();

export const useCarreras = () => {
  const context = useContext(CarreraContext);
  if (!context) {
    
    throw new Error("Error no hay datos");
  }
  return context;
};

export const CarreraProvider=({ children })=> {
  const [carreras, setCarreras] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  
  const getCarreras = async () => {
    try {
      const res = await getCarrerasRequest();
      console.log(res.data)
      setCarreras(res.data);
    } catch (error) {
      console.log("Hubo un errror");
      console.error(error);
    }
  };

  const createCarrera = async (carrera) => {
    //console.log("Registrado createAuthor");
    
    try {
      const res = await createCarrerasRequest(carrera);
      setCarreras(res.data);
      console.log("Autor Registrado");
      navigate("/proyects");
    } catch (error) {
      console.log(error.response);
      console.log("Error al registrar");
      setErrors(error.response.data);
    }
  };
  const deleteCarrera = async (id) => {
    const res = await deleteCarreraRequest();
    console.log(res.data);
  };

  return (
    <CarreraContext.Provider
      value={{
        createCarrera,
        getCarreras,
        deleteCarrera,
        carreras,
        errors
      }}
    >
      {children}
    </CarreraContext.Provider>
  );
};
