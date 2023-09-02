import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button } from "@mui/material";
import { getCarreras } from "../api/carreras";
import { useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowBackIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
  //flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgb(255, 255, 255)",
}));

function Aside() {
  const [expanded, setExpanded] = useState("panel1");
  const [carreras, setCarreras] = useState([]);
  const navigate = useNavigate();

  // carrera: { name: x, categoria: y}
  // obtener solo las categorias en comun de carreras, sin duplicados
  const categorias = carreras.reduce((acc, curr) => {
    if (!acc.includes(curr.categoria) && curr.categoria !== undefined) {
      acc.push(curr.categoria);
    }
    return acc;
  }, []);
  console.log(categorias);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    getCarreras().then((res) => {
      setCarreras(res.data);
    });
  }, []);

  return (
    <Box
      sx={{
        width: { sm: "100%", md: "25%" },
        //backgroundColor: '#CFCFCF',
        paddingTop: { sm: "20px", md: "90px" },
        paddingLeft: "0",
        marginLeft: { sm: "auto", md: "0" },
      }}
      borderLeft={1}
    >
      {categorias.map((categoria) => {
        return (
          <Accordion
            //expanded={expanded === "panel2"}
            onChange={handleChange("panel3")}
            sx={{
              border: "0",
            }}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Button
                sx={{
                  display: "block",
                  paddingRight: "100%",
                  color: "black",
                }}
              >
                {categoria}
              </Button>
            </AccordionSummary>

            <AccordionDetails
              sx={{
                background: "white",
              }}
            >
              {carreras
                .filter((carrera) => carrera.categoria === categoria)
                .map((carrera) => {
                  return (
                    <Button
                      sx={{ display: "block"}}
                      onClick={() => {
                        navigate(`/filepage?carrera=${carrera.slug}`);
                      }}
                    >
                      {carrera.name}
                    </Button>
                  );
                })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

export default Aside;
