import {
  Box,
  Container,
  CssBaseline,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { Component } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import banner1 from "../images/Banner1.png";
import banner2 from "../images/Banner2.png";
import banner3 from "../images/Banner3.png";
import Mision from "../images/pngwing.png";
import Vision from "../images/pngvision.png";
import Seguridad from "../images/pngseguridad.png";

const items = [
  {
    src: banner1,
    //altText: "Imagen 1",
    //caption: "Imagen 1",
  },
  {
    src: banner2,
    //altText: "Imagen 2",
    //caption: "Imagen 2",
  },
  {
    src: banner3,
    //altText: "Imagen 3",
    //caption: "Imagen 3",
  },
];

const defaultTheme = createTheme();
class Home extends Component {
  //Animacion del carrusel de imagenes
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} width="100%" height="70%"  />
          <CarouselCaption
            captionText={item.caption}
            captionHeader={item.caption}
          />
        </CarouselItem>
      );
    });

    return (
      <ThemeProvider theme={defaultTheme}>
        <Container component="main">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 2,
              padding: 0,
              display: "flex",
              textAlign: "left",
              height: "90%",
              overflow: "auto",
              position: "relative",
            }}
          >
            <Carousel
              activeIndex={activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              {slides}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
          </Box>
          <Box sx={{paddingTop: '60px', paddingBottom: '20px'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 345, boxShadow:'5px 3px 8px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={Mision}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Misión
                      </Typography>
                      <Typography color="text.secondary">
                        <p>Facilitamos el acceso y la exploración de proyectos de
                        investigación universitaria a través de una plataforma
                        en línea. Fomentamos la colaboración, el aprendizaje y
                        la inspiración entre la comunidad académica.</p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 345, boxShadow:'5px 3px 8px' }}>
                  <CardActionArea>
                  <CardMedia
                      component="img"
                      height="auto"
                      image={Vision}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Visión
                      </Typography>
                      <Typography color="text.secondary">
                        <p>Seremos la principal fuente de proyectos de
                        investigación, brindando una experiencia atractiva y
                        enriquecedora que promueve el conocimiento compartido y
                        la colaboración.</p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 345, boxShadow:'5px 3px 8px' }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="auto"
                      image={Seguridad}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Seguridad
                      </Typography>
                      <Typography color="text.secondary">
                        <p>Protegemos la propiedad intelectual al permitir la
                        visualización en línea de archivos PDF de investigación.
                        Impedimos la descarga directa para respetar los derechos
                        de autor y utilizamos medidas de seguridad para
                        garantizar un entorno protegido y privado. Nuestro
                        compromiso es brindar acceso responsable al
                        conocimiento.</p>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
export default Home;
