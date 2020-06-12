import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";
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
    <Grid container>
      <Grid xs={1} item style={{ maxWidth: "4%" }} />
      <Grid xs={11} item>
        <ListItem
          alignItems="flex-start"
          key={`key1${props.name}${props.date}${props.response}`}
        >
          <Grid container>
            <Grid xs={12} sm={11} item container direction="row">
              <Grid item xs={1} style={{ maxWidth: "5%" }}>
                <ListItemAvatar>
                  <Avatar alt={props.name} />
                </ListItemAvatar>
              </Grid>
              <Grid item xs={9}>
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
                        {props.response}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </Grid>

      <Divider variant="inset" component="li" />
    </Grid>
  );
});
