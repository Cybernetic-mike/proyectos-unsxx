import axios from "./axios";

export const getTasksRequest = ({ carrera, search }) => {
  // carrera y search to query string
  let queryString = "";

  if (carrera) {
    queryString += `carrera=${carrera}`;
  }

  if (search) {
    queryString += `search=${search}`;
  }

  return axios.get(`/proyects?${queryString}`);
};

export const getTaskRequest = (id) => axios.get(`/proyects/${id}`);

export const createTaskRequest = (task) =>
  axios.post("/proyects", task, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateTaskRequest = (task) =>
  axios.put(`/proyects/${task._id}`, task);
export const deleteTaskRequest = (id) => axios.delete(`/proyects/${id}`);
