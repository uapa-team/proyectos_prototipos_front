import React, { useState, useEffect } from "react";
import MediaCard from "../../Components/MediaCard";
import { withRouter } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import "./Home.scss";
import { Pagination } from "@material-ui/lab";
import { styled } from "@material-ui/core/styles";
import Projects from "./projects";
export const OutherDiv = styled("div")({
  paddingTop: "2%",
});
const shuffle = (array) => {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};
export default withRouter(function App() {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(shuffle(Projects));
  }, []);
  const personalizedMediaCard = (video) => {
    return (
      <MediaCard
        key={video.Video_Key}
        team_name={video.Name}
        video_key={video.Video_Key}
        description={video.Description.substring(0, 147)}
      />
    );
  };
  return (
    <OutherDiv>
      <Grid>
        <Typography
          variant="h2"
          style={{ textAlign: "center", marginBottom: "1%" }}
        >
          Bienvenido/a a la Jornada de Proyectos y Prototipos
        </Typography>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "1%" }}
        >
          <p>
            Bienvenido/a a la jornada de proyectos y prototipos de la Facultad
            de Ingeniería de la Universidad Nacional de Colombia. En esta
            plataforma podrás conocer información sobre los proyectos de
            realizados a lorgo del primer semestre del año 2020 por estudiantes
            que están cursando las asignaturas de "Introducción a la ingeniería"
            y "Estructura de datos". Cada equipo de trabajo desarrolló un póster
            que, acompañado de una descripción y un corto vídeo, tienen la
            intención de comunicar los objetivos, procesos, aprendizajes y
            resultados obtenidos dentro de sus proyectos académicos.
          </p>
        </Typography>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "1%" }}
        >
          <p>
            La plataforma te mostrará de forma aleatoria cada de uno de los
            proyectos participantes de la feria, te invitamos a que luego de
            verlos dejes tus apreciaciones y/o retroalimentación en el espacio
            de "comentarios".
          </p>
        </Typography>
      </Grid>
      <Grid>
        <div className="masonry-with-columns">
          {cards.slice((page - 1) * 12, page * 12).map(personalizedMediaCard)}
        </div>
      </Grid>
      <Grid container direction="row-reverse" style={{ marginBottom: "3%" }}>
        <Pagination
          count={Math.ceil(cards.length / 12)}
          color="primary"
          onChange={(_, p) => {
            setPage(p);
            window.scrollTo(0, 0);
          }}
          page={page}
        />
      </Grid>
    </OutherDiv>
  );
});
