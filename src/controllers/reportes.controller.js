import { buildPDF } from "../libs/pdfKit.js";

export const getReporte = (req, res) => {
  // curren local date
  console.log(new Date().toLocaleDateString());

  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=reporte-${new Date().toLocaleDateString()}.pdf`,
  });

  buildPDF(
    (data) => stream.write(data),
    () => stream.end()
  );
};
