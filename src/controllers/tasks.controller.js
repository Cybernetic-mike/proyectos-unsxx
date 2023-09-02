import Project from "../models/project.model.js";
import Carrera from "../models/carrera.model.js";
import Author from "../models/author.model.js";

export const getProjects = async (req, res) => {
  let dbQuery = {};

  if (req.query.carrera) {
    const carrera = await Carrera.findOne({ slug: req.query.carrera });
    console.log(carrera);
    if (carrera) {
      dbQuery = { carrera: carrera._id };
    }
  }

  // si existe el query search, buscar por regex en campo title, summary o carrera
  if (req.query.search) {
    dbQuery = {
      ...dbQuery,
      $text: {
        $search: req.query.search,
      },
    };
  }

  const tasks = await Project.find(dbQuery).populate("carrera");
  console.log(tasks);

  if (!tasks) {
    const carrera = await Carrera.find({
      $text: { $search: req.query.search },
    });
    if (carrera) {
      dbQuery = { carrera: carrera._id };
    }

    const tasks = await Project.find(dbQuery).populate("carrera");
    console.log(tasks);

    if (!tasks) {
      return res.status(404).json({ message: "No se encontraron proyectos" });
    }

    return res.json(tasks);
  }

  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { registration, title, summary, file, date } = req.body;

  try {
    const registrationFound = await Author.findOne({ registration });
    console.log(registrationFound);

    const carrera = await Carrera.find({
      $text: { $search: registrationFound.career },
    });

    if (registrationFound) {
      if (req.files?.file) {
        await req.files.file.mv(`./src/uploads/${req.files.file.md5}.pdf`);
        console.log(req.files);
      } else return res.status(500).json(["Archivo .PDF no seleccionado"]);

      const newTask = new Project({
        registration,
        title,
        summary,
        date,
        user: req.user.id,
        file: `/uploads/${req.files.file.md5}.pdf`,
        carrera: carrera[0]._id,
      });
      console.log(newTask);

      const savedTask = await newTask.save();

      res.json(savedTask);
    } else return res.status(500).json(["La matricula no existe"]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const Project = await Project.findById(req.params.id).populate("user");
  if (!Project)
    return res.status(404).json({ message: "No se pudo añadir el proyecto" });
  res.json(Project);
};

export const deleteTask = async (req, res) => {
  const Project = await Project.findByIdAndDelete(req.params.id);
  if (!Project)
    return res.status(404).json({ message: "No se pudo eliminar el proyecto" });
  return res.sendStatus(204);
};

export const updateTask = async (req, res) => {
  const Project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!Project)
    return res
      .status(404)
      .json({ message: "No se pudo actualizar el proyecto" });
  res.json(Project);
};
