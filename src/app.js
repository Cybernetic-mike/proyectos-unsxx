import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";

import projectRoutes from "./routes/projects.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import authorRoutes from "./routes/author.routes.js"
import carreraRoutes from "./routes/carrera.routes.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../client/build')));

// Resto de la configuración de tu servidor aquí

// Ruta de ejemplo para servir la página principal de React
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});


app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    // tempFileDir: path.resolve("./src/uploads"),
    tempFileDir: "./src/uploads",
    // createParentPath: true,
    // limits: { fileSize: 10 * 1024 * 1024 },
    // abortOnLimit: true,
    // responseOnLimit: "archivo demasiado grande",
  })
);
// app.use(express.urlencoded({ extended: true }));

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", uploadRoutes);
app.use("/api", authorRoutes);
app.use("/api", carreraRoutes);

app.use("/uploads", express.static(path.resolve("./src/uploads")));

export default app;
