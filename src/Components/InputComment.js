import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Snackbar,
  List,
  TextField,
  Grid,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import MuiAlert from "@material-ui/lab/Alert";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Backend from "../serviceBackend";
//import useComments from "../Hooks/useComments";
export default withRouter(function (props) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [openG, setOpenG] = useState(false);
  const [openR, setOpenR] = useState(false);
  const handleClickG = () => {
    setOpenG(true);
  };
  const handleCloseG = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenG(false);
  };
  const handleClickR = () => {
    setOpenR(true);
  };
  const handleCloseR = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenR(false);
  };
  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: "inline",
      fontWeight: 600,
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  }));
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  return (
    <Card style={{ minWidth: 275, marginTop: "2%" }} variant="outlined">
      <CardContent style={{ paddingBottom: "0px", paddingTop: "0px" }}>
        <List style={{ paddingBottom: "0px", paddingTop: "0px" }}>
          <ListItem
            alignItems="flex-start"
            style={{ paddingTop: "1%", paddingBottom: "0px" }}
            key="avatr"
          >
            <ListItemAvatar>
              <Avatar alt={props.name || "name"} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <TextField
                  style={{ width: "30%" }}
                  id="outlined-basic"
                  label="Nombre Completo"
                  variant="outlined"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              }
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  ></Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem
            style={{ paddingTop: "0px", paddingBottom: "1.5%" }}
            key="field"
          >
            <Grid container>
              <Grid item xs={12} sm={10}>
                <TextField
                  style={{ marginTop: "1%", width: "100%" }}
                  id="outlined-multiline-static"
                  label="Inserta aquí tu comentario"
                  multiline
                  rows={2}
                  value={comment}
                  variant="outlined"
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                style={{ alignSelf: "center", textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Send />}
                  onClick={(e) => {
                    e.preventDefault();
                    Backend.sendRequest("post", `/comment/${props.video_key}`, {
                      full_name: name,
                      comment: comment,
                    }).then((res) => {
                      if (res.status === 200) {
                        handleClickG();
                        setName("");
                        setComment("");
                        window.location.reload();
                      } else {
                        handleClickR();
                      }
                    });
                  }}
                >
                  Enviar comentario
                </Button>
                <Snackbar
                  open={openG}
                  autoHideDuration={6000}
                  onClose={handleCloseG}
                >
                  <Alert onClose={handleCloseG} severity="success">
                    <Typography variant="h5">Comentario enviado!</Typography>
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={openR}
                  autoHideDuration={6000}
                  onClose={handleCloseR}
                >
                  <Alert onClose={handleCloseR} severity="error">
                    <Typography variant="h5">Ups! Hubo un problema!</Typography>
                  </Alert>
                </Snackbar>
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
});
