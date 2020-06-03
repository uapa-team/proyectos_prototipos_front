import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Grid } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
export default withRouter(function (props) {
  const [showRes, setShowRes] = useState(false);
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
  }));
  return (
    <div
      onMouseEnter={(event) => {
        event.preventDefault();
        // console.log("out");
        setShowRes(true);
      }}
      onMouseLeave={(event) => {
        event.preventDefault();
        setShowRes(false);
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
          {showRes ? (
            <Grid xs={12} sm={1} item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Create />}
              >
                Responder
              </Button>
            </Grid>
          ) : (
            <div />
          )}
        </Grid>
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
});
