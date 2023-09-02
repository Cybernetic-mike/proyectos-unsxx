import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Licencia = ({ isOpen, onRequestClose }) => {
  return (
    <Modal open={isOpen} onClose={onRequestClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2">
          Licencia
        </Typography>
        {/* Contenido de la licencia */}
        <Typography variant="body2" sx={{ mt: 2 }}>
          Licencia para Uso Académico y Sin Fines de Lucro Este trabajo y todo
          su contenido están protegidos por la siguiente licencia: 
          <br/>
          1. Uso
          Académico: Este trabajo y su contenido están destinados únicamente
          para fines académicos y educativos. Se permite su uso en entornos
          educativos, proyectos de clase, investigaciones y otros contextos
          similares. <br/>
          2. Sin Fines de Lucro: No está permitido utilizar este
          trabajo o su contenido con fines comerciales o lucrativos. Cualquier
          uso con intenciones de lucro está expresamente prohibido. <br/>
          3.
          Atribución Obligatoria: Si utilizas este trabajo o su contenido en
          cualquier forma, debes proporcionar una atribución adecuada al autor
          original. Debes citar claramente al autor y proporcionar un enlace a
          la fuente original. <br/>
          4. Prohibición de Plagio: Cualquier copia,
          reproducción o uso de este trabajo o su contenido sin la debida
          atribución al autor será considerado un acto de plagio y estará sujeto
          a las consecuencias legales y académicas correspondientes. <br/>
          5. Modificaciones y Compartición: Estás autorizado a realizar
          modificaciones en este trabajo y a compartir esas modificaciones bajo
          los mismos términos. Sin embargo, las modificaciones deben ser
          claramente atribuidas y no pueden ser utilizadas con fines
          comerciales. <br/>
          Al utilizar este trabajo y su contenido, aceptas los
          términos de esta licencia y te comprometes a cumplir con sus
          condiciones.
        </Typography>
        <Button onClick={onRequestClose} sx={{ mt: 3 }}>
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default Licencia;
