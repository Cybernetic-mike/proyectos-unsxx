import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
} from "../api/tasks";
import { useNavigate } from "react-router-dom";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("No existe el proyecto");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const getTasks = async (queryObj) => {
    try {
      const res = await getTasksRequest(queryObj);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
      setErrors(error.response.data);
    }
  };

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
    
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest();
    console.log(res.data);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        errors,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
