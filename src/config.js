import { config } from "dotenv";
config();

export const TOKEN_SECRET = "clave secreta";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
