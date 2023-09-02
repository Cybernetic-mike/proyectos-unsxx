import { Router } from "express";
import { createCarrera, getCarreras } from "../controllers/carrera.controller.js";

const router = Router();

router.post("/carrera", createCarrera);
router.get("/carrera", getCarreras);

export default router;
