// import PDFDocument from "pdfkit";
import PDFDocument from "pdfkit-table";

import ProjectModel from "../models/project.model.js";

// Funcion que crea el PDF
export async function buildPDF(dataCallback, endCallback) {
  const doc = new PDFDocument();

  // configuracion del PDF
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // Encabezado de la tabla del PDF
  const tableArray = {
    headers: [
      { label: "Nº", property: "name", width: 10, renderer: null },
      {
        label: "Proyecto",
        property: "title",
        width: 150,
        renderer: null,
      },
      { label: "Carrera", property: "price1", width: 100, renderer: null },
      { label: "Fecha", property: "price2", width: 100, renderer: null },
      { label: "Visitas", property: "price3", width: 80, renderer: null },
    ],
    rows: [],
  };

  // Filas de la tabla del PDF
  const projects = await ProjectModel.find().populate("carrera");

  projects.forEach((project, index) => {
    tableArray.rows.push([
      index + 1,
      project.title,
      project.carrera.name.toUpperCase(),
      new Date(project.date).toLocaleDateString(),
      project.visits,
    ]);
  });

  // ver datos de la tabla
  console.log(tableArray);

  //   Generar PDF
  doc.fontSize(25).text(`Reporte ${new Date().toLocaleDateString()}`, 100, 100);
  doc.table(tableArray, { width: 500 }); // A4 595.28 x 841.89 (portrait) (about width sizes)

  //   Finalizar PDF
  doc.end();
}
