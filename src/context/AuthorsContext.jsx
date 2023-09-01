import { createContext, useContext, useState } from "react";
import {
  createAuthorRequest,
  getAuthorsRequest,
  deleteAuthorRequest,
} from "../api/authors";
import { useNavigate } from "react-router-dom";

const AuthorContext = createContext();

export const useAuthors = () => {
  const context = useContext(AuthorContext);
  if (!context) {
    console.log(context);
    throw new Error("No existe el Autor");
  }
  return context;
};

export const AuthorProvider=({ children })=> {
  const [authors, setAuthors] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getAuthors = async () => {
    try {
      const res = await getAuthorsRequest();
      console.log(res.data)
      setAuthors(res.data);
    } catch (error) {
      console.log("Hubo un errror");
      console.error(error);
    }
  };

  const createAuthor = async (author) => {
    //console.log("Registrado createAuthor");
    
    try {
      const res = await createAuthorRequest(author);
      setAuthors(res.data);
      console.log("Autor Registrado");
      navigate("/proyects");
    } catch (error) {
      console.log(error.response);
      console.log("Error al registrar");
      setErrors(error.response.data);
    }
  };
  const deleteAuthor = async (id) => {
    const res = await deleteAuthorRequest();
    console.log(res.data);
  };

  return (
    <AuthorContext.Provider
      value={{
        createAuthor,
        getAuthors,
        deleteAuthor,
        authors,
        errors
      }}
    >
      {children}
    </AuthorContext.Provider>
  );
};
