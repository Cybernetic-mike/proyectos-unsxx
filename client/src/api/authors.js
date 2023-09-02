import axios from "./axios";

export const getAuthorsRequest =()=> axios.get(`/authors`);
export const getAuthorRequest = (id) => axios.get(`/authors/${id}`);

export const createAuthorRequest = (author) => axios.post(`/authors`, author);

export const updateAuthorRequest = (author) =>
  axios.put(`/authors/${author._id}`, author);
export const deleteAuthorRequest = (id) => axios.delete(`/authors/${id}`);