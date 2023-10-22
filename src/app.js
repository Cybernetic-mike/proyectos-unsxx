import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import multer from "multer";

import projectRoutes from "./routes/projects.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import authorRoutes from "./routes/author.routes.js";
import carreraRoutes from "./routes/carrera.routes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

import nodemailer from "nodemailer";
import { getProjects } from "./controllers/tasks.controller.js";

import enviarMail from "./email.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "../client/build")));

// Resto de la configuración de tu servidor aquí

// Ruta de ejemplo para servir la página principal de React
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use(
  cors({
    origin: "https://proyectos-unsxx.site",
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
    tempFileDir: "./src",
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
app.use(express.static('./uploads'));

app.use("/uploads", express.static(path.resolve("./src/uploads")));

app.get("/api/uploads", (req, res) => {
  // Obtén la lista de archivos en tu carpeta
  getProjects;
  const folderPath = "./src/uploads";
  console.log("");
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al leer la carpeta de archivos" });
    } else {
      res.json({ files });
    }
  });
});

app.post("/api/uploads", (req, res) => {
  const selectedFiles = req.body;
  //console.log(selectedFiles);
  const folderPath = "./src/uploads";

  // Inicializa Archiver para crear un archivo ZIP
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Nivel de compresión
  });

  // Crea un flujo de lectura para el archivo ZIP
  const output = fs.createWriteStream(
    "./src/backups/copia-de-seguridad-proyectos.zip"
  );

  // Pipe Archiver al flujo de salida

  const arreglo = Object.keys(selectedFiles);
  // Agrega los archivos seleccionados al archivo ZIP
  arreglo.forEach((file) => {
    const value = selectedFiles[file];
    const filePath = path.join(folderPath, value);
    archive.file(filePath, { name: value });
    console.log(filePath);
  });

  archive.pipe(output);
  // Finaliza el archivo ZIP
  archive.finalize();

  // Envía el archivo ZIP como respuesta al cliente
  output.on("close", function () {
    res.download(
      "./src/backups/copia-de-seguridad-proyectos.zip",
      "copia-de-seguridad-proyectos.zip",
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Error al descargar archivos" });
        }
      }
    );
  });
  //const downloadUrl = '/archivo.zip';
});
app.get("/api/download/archivo.zip", (req, res) => {
  const filePath = __dirname + "/backups/copia-de-seguridad-proyectos.zip"; // Ruta completa al archivo ZIP
  console.log(filePath);
  res.download(filePath, "copia-de-seguridad-proyectos.zip", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error al descargar archivos" });
    }
  });
});

// Configuración de multer para guardar archivos en una carpeta específica
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const uploadDir = "./src/uploads"; // Carpeta donde se guardarán los archivos PDF
    fs.mkdirSync(uploadDir, { recursive: true }); // Crea la carpeta si no existe
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    // Genera un nombre de archivo único para evitar colisiones
    const ext = path.extname(file.originalname);
    const uniqueFileName = file.originalname;
    callback(null, uniqueFileName);
  },
});

//enviarMail();



// Función para imprimir los documentos de la colección

//imprimirDocumentos();
// Llamar a la función para imprimir los documentos

export default app;
