import axios from "./axios";

export const getCarrerasRequest = () => axios.get("/carrera");

export const createCarrerasRequest = (carrera) => axios.post(`/carrera`, carrera);
export const deleteCarreraRequest = (id) => axios.delete(`/carrera/${id}`);
