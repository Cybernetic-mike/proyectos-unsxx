import Project from "../models/project.model.js";
import Carrera from "../models/carrera.model.js";
import Author from "../models/author.model.js";
import imprimirDocumentos from "../notifications.js";

export const getProjects = async (req, res) => {
  let dbQuery = {};

  if (req.query.carrera) {
    const carrera = await Carrera.findOne({ slug: req.query.carrera });
    //console.log(carrera);

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

  const tasks = await Project.find(dbQuery)
    .sort({ visits: -1 })
    .populate("carrera");
  //console.log(tasks);

  if (!tasks) {
    const carrera = await Carrera.find({
      $text: { $search: req.query.search },
    });
    if (carrera) {
      dbQuery = { carrera: carrera._id };
    }

    const tasks = await Project.find(dbQuery)
      .sort({ visits: -1 })
      .populate("carrera");
    //console.log(tasks);
    //console.log("getTask");

    if (!tasks) {
      return res.status(404).json({ message: "No se encontraron proyectos" });
    }

    return res.json(tasks);
  }
  console.log("Se llamo a getProyect");
  res.json(tasks);
  /*try {
    const project = await Project.find().sort({ visits: -1 }); // Ordena en orden descendente
    //res.json(project);
    console.log(project)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al obtener los datos ordenados.' });
  }
  //console.log("Mnesaje getTask");
*/
};

export const createTask = async (req, res) => {
  const { registration, title, summary, file, date, visits } = req.body;

  try {
    const registrationFound = await Author.findOne({ registration });
    //console.log(registrationFound);

    const carrera = await Carrera.find({
      $text: { $search: registrationFound.career },
    });

    if (registrationFound) {
      if (req.files?.file) {
        await req.files.file.mv(`./src/uploads/${req.files.file.md5}.pdf`);
        //console.log(req.files);
      } else return res.status(500).json(["Archivo .PDF no seleccionado"]);

      const newTask = new Project({
        registration,
        title,
        summary,
        date,
        user: req.user.id,
        file: `/uploads/${req.files.file.md5}.pdf`,
        carrera: carrera[0]._id,
        visits: 0,
      });
      //console.log(newTask);
      getProjects
      const savedTask = await newTask.save();
      //sendEmail('miguel.callizaya@gmail.com', 'Confirmación de registro', '¡Gracias por registrarte en nuestra aplicación!');
      imprimirDocumentos();
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
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project)
    return res
      .status(404)
      .json({ message: "No se pudo actualizar el proyecto" });
  res.json(Project);

  const maxNumber = await Project.aggregate([
    { $group: { _id: null, maxCampoEntero: { $max: "$visits" } } },
  ]);

  if (maxNumber.length > 0) {
    project.maxCampoEntero = maxNumber[0].maxCampoEntero;
  }
  const maxCampoEntero = project.maxCampoEntero;
  //res.json({Project, maxCampoEntero});
  console.log(project.maxCampoEntero);
};
