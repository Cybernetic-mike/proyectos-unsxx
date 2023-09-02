import Carrerar from "../models/carrera.model.js";

export const createCarrera = async (req, res, next) => {
  const newCarrera = new Carrerar(req.body);

  if (!req.body.slug) {
    newCarrera.slug = newCarrera.name.toLowerCase().replace(" ", "-");
  }

  const carreraSaved = await newCarrera.save();

  res.status(201).json(carreraSaved);
};

export const getCarreras = async (req, res, next) => {
  const carreras = await Carrerar.find();
  res.json(carreras);
};
