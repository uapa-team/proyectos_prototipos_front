import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid, Collapse, Paper } from "@material-ui/core";
import { Create, Clear } from "@material-ui/icons";
import InputRespose from "./InputResponse";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Response from "./Response";
import Backend from "../serviceBackend";
export default withRouter(function (props) {
  const [showResBtn, setShowResBtn] = useState(false);
  const [showResBox, setShowResBox] = useState(false);
  const [responses, setResponses] = useState([]);
  useEffect(() => {
    Backend.sendRequest("get", `/responses/${props.id}`)
      .then((res) => res.json())
      .then((res) => setResponses(res.responses));
    // eslint-disable-next-line
  }, []);
  const appendResponse = (response) => {
    setResponses([...responses, response]);
  };
  const disableBox = () => {
    setShowResBox(false);
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
    paper: {
      margin: theme.spacing(1),
    },
  }));
  const PersonalizedResponses = (response) => {
    return (
      <Response
        key={response.id}
        name={response.full_name}
        response={response.response}
        date={response.date}
      />
    );
  };
  return (
    <div
      onMouseEnter={(event) => {
        event.preventDefault();
        // console.log("out");
        setShowResBtn(true);
      }}
      onMouseLeave={(event) => {
        event.preventDefault();
        setShowResBtn(false);
      }}
    >
      <ListItem
        alignItems="flex-start"
        key={`key1${props.name}${props.date}${props.comment}`}
      >
        <Grid container>
          <Grid xs={12} sm={11} item container direction="row">
            <Grid item xs={1} style={{ maxWidth: "5%" }}>
              <ListItemAvatar>
                <Avatar alt={props.name} />
              </ListItemAvatar>
            </Grid>
            <Grid item xs={11}>
              <ListItemText
                style={{ wordBreak: "break-all" }}
                primary={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">{`${props.name} — `}</Typography>
                    <Typography
                      style={{ height: "15px" }}
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >{` ${props.date}`}</Typography>
                  </div>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body1"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {props.comment}
                    </Typography>
                  </React.Fragment>
                }
              />
            </Grid>
          </Grid>
          {showResBtn ? (
            <Grid xs={12} sm={1} item>
              {showResBox ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Clear />}
                  onClick={() => setShowResBox(!showResBox)}
                >
                  Cancelar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Create />}
                  onClick={() => setShowResBox(!showResBox)}
                >
                  Responder
                </Button>
              )}
            </Grid>
          ) : (
            <div />
          )}
        </Grid>
      </ListItem>
      {responses.map(PersonalizedResponses)}
      <Collapse in={showResBox}>
        <Paper elevation={4}>
          <InputRespose
            id={props.id}
            appendResponse={appendResponse}
            disableBox={disableBox}
          />
        </Paper>
      </Collapse>
      <Divider variant="inset" component="li" />
    </div>
  );
});
