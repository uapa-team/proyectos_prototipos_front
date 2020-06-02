import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
export default withRouter(function (props) {
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
    <>
      <ListItem
        alignItems="flex-start"
        key={`key1${props.name}${props.date}${props.comment}`}
      >
        <ListItemAvatar>
          <Avatar alt={props.name} />
        </ListItemAvatar>
        <ListItemText
          primary={props.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.date}
              </Typography>
              {` — ${props.comment}`}
            </React.Fragment>
          }
        />
        <Button variant="contained" color="primary">
          Responder
        </Button>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
});
