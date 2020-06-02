import React, { useState, useEffect } from "react";
import MediaCard from "../../Components/MediaCard";
import { withRouter } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Backend from "../../serviceBackend";
export const OutherDiv = styled("div")({
  paddingTop: "2%",
});
export default withRouter(function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    Backend.sendRequest("get", "/videos")
      .then((res) => res.json())
      .then((res) => setVideos(res.videos));
    // eslint-disable-next-line
  }, [1]);
  const personalizedMediaCard = (video) => {
    return (
      <Grid item xs={12} sm={4} key={video.id}>
        <MediaCard
          team_name={video.team_name}
          video_key={video.video_key}
          description={video.description}
        />
      </Grid>
    );
  };
  return (
    <OutherDiv>
      <Grid>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Bienvenido a la muestra de proyectos de TPI - Expoideas
        </Typography>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: "2%" }}>
        {videos.map(personalizedMediaCard)}
      </Grid>
    </OutherDiv>
  );
});
