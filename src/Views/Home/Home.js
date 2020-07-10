import React from "react";
// import MediaCard from "../../Components/MediaCard";
import { withRouter } from "react-router-dom";
import { Typography, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import "./Home.css";
// import { Pagination } from "@material-ui/lab";
import { styled } from "@material-ui/core/styles";
// import Backend from "../../serviceBackend";
export const OutherDiv = styled("div")({
  paddingTop: "2%",
});
export default withRouter(function App() {
  // const [videos, setVideos] = useState([]);
  // useEffect(() => {
  //   Backend.sendRequest("get", "/videos")
  //     .then((res) => res.json())
  //     .then((res) => setVideos(res.videos));
  //   // eslint-disable-next-line
  // }, [1]);
  // const personalizedMediaCard = (video) => {
  //   return (
  //     <Grid item xs={12} sm={4} key={video.video_key}>
  //       <MediaCard
  //         team_name={video.team_name}
  //         video_key={video.video_key}
  //         description={video.description.substring(0, 147)}
  //       />
  //     </Grid>
  //   );
  // };
  return (
    <OutherDiv>
      <Grid>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          Bienvenido a la Jornada de Proyectos y Prototipos
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{ marginBottom: "1%", marginTop: "5%" }}
      >
        {/* {videos.map(personalizedMediaCard)} */}
        <Alert variant="filled" severity="success">
          <Typography variant="h2" style={{ textAlign: "center" }}>
            A partir del lunes 14 de julio, encuentra aquí todos los proyectos
            de los estudiantes que están cursando las asignturas de introducción
            a la ingeniería y estructuras de datos!
          </Typography>
        </Alert>
      </Grid>
      {/* <Grid container direction="row-reverse" style={{ marginBottom: "3%" }}>
        <Pagination count={10} color="primary" />
      </Grid> */}
    </OutherDiv>
  );
});
