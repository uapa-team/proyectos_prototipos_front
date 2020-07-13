import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { styled } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
export default withRouter(function (props) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const FixedCard = styled(CardMedia)({
    height: 240,
  });
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  return (
    <Card
      style={{
        marginBottom: "5%",
        backgroundColor:
          props.subject === "Data Structures" ? "dodgerblue" : "white",
      }}
    >
      <CardActionArea
        onClick={() => props.history.push(`/video/${props.video_key}`)}
      >
        <FixedCard
          image={`https://i.ytimg.com/vi/${props.video_key}/hqdefault.jpg`}
          title={props.team_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {props.team_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = `https://ingenieria.bogota.unal.edu.co/proyectos_prototipos/video/${props.video_key}`;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
            handleClick();
          }}
        >
          <Typography style={{ fontWeight: "600" }}>Compartir</Typography>
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => props.history.push(`/video/${props.video_key}`)}
        >
          <Typography style={{ fontWeight: "600" }}>Ver más</Typography>
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            <Typography variant="h5">
              URL copiada al portapapeles! Compártela en tus redes sociales!
            </Typography>
          </Alert>
        </Snackbar>
      </CardActions>
    </Card>
  );
});
