import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import EditBasicDetails from "./EditBasicDetails";
import {Button, Divider, Link, Typography} from "@material-ui/core";
import EditObject from "./EditObject";
import EditOthersDetails from "./EditOthersDetails";
import EditArray from "./EditArray";
import EditPostDetails from "./EditPostDetails";


const useStyles = makeStyles(theme => ({
  root: {
    width: '78%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2),
    "& > *": {paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2)}
  },
  divider: {marginTop: theme.spacing(1), marginBottom: theme.spacing(1)},
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: 'space-between',
  },
  postCounts: {
    marginLeft: theme.spacing(2)
  },
  postContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: 'center',
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2)
  }
}));


const PostView = ({active, post, setPost, triggerSubmit}) => {
  const classes = useStyles()
  return <div className={classes.root}>
    <div className={classes.titleContainer}>
      <Typography variant="h5">{active.name || "Post Details"}</Typography>
      <Button variant="contained" color="primary" component={Link} href={post.source} target="_blank">View Post
        Source</Button>
    </div>
    <Divider className={classes.divider}/>
    {active.key === "basicDetails" && <EditBasicDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>}
    {["vacancyDetails", "ageLimit", "feeDetails", "dates", "importantLinks"].map((key, index) => {
      return active.key === key && <EditObject key={`key-${index}`} keyName={active.key} post={post} setPost={setPost}
                                               triggerSubmit={triggerSubmit}/>
    })}
    {["howToApply", "selectionProcess"].map(key => {
      return active.key === key && <EditArray key={active.key} keyName={active.key} post={post} setPost={setPost}
                                              triggerSubmit={triggerSubmit}/>
    })}
    {active.key === "others" && <EditOthersDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>}
    {!active.key && <EditPostDetails post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>}
  </div>
}

export default PostView
