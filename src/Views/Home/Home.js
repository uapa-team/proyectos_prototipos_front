import React, { useState, useEffect } from "react";
import MediaCard from "../../Components/MediaCard";
import { withRouter } from "react-router-dom";
import { Typography, Grid, TextField } from "@material-ui/core";
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
export default withRouter(() => {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
        subject={video.Subject}
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
            En esta plataforma podrás conocer los proyectos realizados por
            estudiantes que durante el primer semestre del año 2020 cursaron las
            asignaturas de "Introducción a la ingeniería" y "Estructuras de
            datos”. Cada equipo de trabajo elaboró un póster que, acompañado de
            una descripción y un corto vídeo, tiene la intención de comunicar
            los objetivos, procesos, aprendizajes y resultados obtenidos dentro
            de sus proyectos académicos.
          </p>
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h5"
              style={{ textAlign: "center", marginBottom: "1%" }}
            >
              <p>
                La plataforma mostrará de forma aleatoria cada de uno de los
                proyectos participantes en la jornada. Te invitamos a que luego
                de verlos dejes tus apreciaciones y/o retroalimentación en el
                espacio de "comentarios".
              </p>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
            <TextField
              id="outlined-basic"
              label="Buscar proyectos"
              variant="outlined"
              style={{ width: "70%" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid>
        <div className="masonry-with-columns">
          {cards
            .filter((video) =>
              video.Name.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                  searchTerm
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                )
            )
            .slice((page - 1) * 12, page * 12)
            .map(personalizedMediaCard)}
        </div>
      </Grid>
      <Grid container direction="row-reverse" style={{ marginBottom: "3%" }}>
        <Pagination
          count={Math.ceil(
            cards.filter((video) =>
              video.Name.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                  searchTerm
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                )
            ).length / 12
          )}
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
