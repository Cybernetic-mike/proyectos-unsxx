import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProjects,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createTaskSchema } from "../schemas/task.chema.js";
import { uploadFile } from "../controllers/upload.controller.js";

const router = Router();

router.get("/proyects", getProjects);
router.get("/proyects/:id", authRequired, getTask);

router.post(
  "/proyects",
  authRequired,
  // validateSchema(createTaskSchema),
  createTask
);

router.delete("/proyects/:id", authRequired, deleteTask);
router.put("/proyects/:id", updateTask);

export default router;
