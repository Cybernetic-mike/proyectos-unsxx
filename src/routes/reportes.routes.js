import { Router } from "express";
import { getReporte } from "../controllers/reportes.controller.js";

const router = Router();

// http://localhost:4000/api/reporte -> descarga el PDF
router.get("/reporte", getReporte);

export default router;
