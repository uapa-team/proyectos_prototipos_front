import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { OutherDiv } from "../Home/Home";
import { makeStyles } from "@material-ui/core/styles";
import Comment from "../../Components/Comment";
import InputComment from "../../Components/InputComment";
import List from "@material-ui/core/List";
import Backend from "../../serviceBackend";
export default withRouter(function (props) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    Backend.sendRequest("get", `/comments/${props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => setComments(res.comments));
    // eslint-disable-next-line
  }, [1]);
  const classes = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: "36ch",
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const VideoContainer = styled("div")({
    position: "relative",
    width: "100%",
    height: 0,
    paddingBottom: "56.25%",
  });
  const VideoFrame = styled("iframe")({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  });
  const PersonalizedComment = (comment) => {
    return (
      <Comment
        key={`${comment.full_name}${comment.date}${comment.comment}`}
        name={comment.full_name}
        date={comment.date}
        comment={comment.comment}
      />
    );
  };
  return (
    <OutherDiv>
      <Grid container style={{ marginBottom: "2%" }}>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
          <VideoContainer>
            <VideoFrame
              title="TPI Expoideas"
              src={`https://www.youtube.com/embed/${props.match.params.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>
        </Grid>
      </Grid>
      <Grid style={{ marginBottom: "5%" }}>
        <List className={classes.root}>
          {comments.map(PersonalizedComment)}
          <InputComment video_key={props.match.params.id} />
        </List>
      </Grid>
    </OutherDiv>
  );
});
