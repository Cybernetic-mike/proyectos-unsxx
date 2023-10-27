import Carrerar from "../models/carrera.model.js";

export const createCarrera = async (req, res, next) => {
  const newCarrera = new Carrerar(req.body);

  if (!req.body.slug) {
    newCarrera.slug = newCarrera.name.replace(/ /g, "-");
    //newCarrera.slug = newCarrera.name.toLowerCase().replace(" ", "-");
    console.log(newCarrera);
  }

  const carreraSaved = await newCarrera.save();

  res.status(201).json(carreraSaved);
};

export const getCarreras = async (req, res, next) => {
  const carreras = await Carrerar.find();
  res.json(carreras);
};

export const deleteCarrera = async (req, res) => {
  const carreras = await Carrerar.findByIdAndDelete(req.params.id);
  if (!carreras)
    return res.status(404).json({ message: "No se pudo eliminar la carrera" });
  return res.sendStatus(204);
};