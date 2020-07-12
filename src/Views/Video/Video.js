import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { OutherDiv } from "../Home/Home";
import { makeStyles } from "@material-ui/core/styles";
import Comment from "../../Components/Comment";
import InputComment from "../../Components/InputComment";
import List from "@material-ui/core/List";
import Backend from "../../serviceBackend";
import Projects from "../Home/projects";
export default withRouter(function (props) {
  const [project, setProject] = useState({});
  const [comments, setComments] = useState([]);
  useEffect(() => {
    Projects.forEach((value) => {
      if (value.Video_Key === props.match.params.id) {
        setProject(value);
      }
    });
    Backend.sendRequest("get", `/comments/${props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setComments(res.comments);
      });
    // eslint-disable-next-line
  }, []);
  const appendComment = (comment) => {
    setComments([...comments, comment]);
  };
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
        key={`${comment.id}`}
        name={comment.full_name}
        date={comment.date}
        comment={comment.comment}
        id={comment.id}
      />
    );
  };
  return (
    <OutherDiv>
      <Grid>
        <Typography variant="h2" style={{ textAlign: "center" }}>
          {project.Name}
        </Typography>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} style={{ alignSelf: "center" }}>
          <Typography
            variant="body1"
            style={{ textAlign: "justify", marginBottom: "2%" }}
          >
            {project.Description}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <img
            alt={"poster"}
            src={`https://i.imgur.com/${project.Poster_Key}.png`}
            width="100%"
            style={{ marginBottom: "2%" }}
          />
        </Grid>
      </Grid>
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
          <InputComment
            video_key={props.match.params.id}
            appendComment={appendComment}
          />
        </List>
      </Grid>
    </OutherDiv>
  );
});
