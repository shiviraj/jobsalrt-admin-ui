import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Skeleton} from "@material-ui/lab";
import {Divider, Typography} from "@material-ui/core";
import Post from "./Post";
import Pagination from "../../utils/Pagination";
import AddNewPost from "../editPost/AddNewPost";


const useStyles = makeStyles(theme => ({
  root: {
    width: '80%',
    backgroundColor: theme.palette.common.white,
    paddingTop: theme.spacing(2)
  },
  titleContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(4),
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
  },
  skeleton: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey[100],
    textAlign: "center"
  },
  circleSkeleton: {
    display: "flex",
    justifyContent: 'center'
  },
  divider: {marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}
}));

const PostSkeletons = () => {
  const classes = useStyles()
  return <>
    {Array(12).fill("").map((_, index) => {
      return <div className={classes.skeleton} key={"key_" + index}>
        <Skeleton animation="wave" variant="text"/>
        <div className={classes.circleSkeleton}>
          <Skeleton animation="wave" variant="circle" width={60} height={60}/>
        </div>
        <Skeleton animation="wave" variant="rect" width={280} height={180}/>
      </div>
    })}
  </>;
};

const PostContainer = ({posts, page, setPage, count}) => {
  const limit = 48
  const classes = useStyles()
  const start = (page - 1) * limit + 1;
  const end = (page * limit) > count.totalPost ? count.totalPost : page * limit;
  return <div className={classes.root}>
    <div className={classes.titleContainer}>
      <div className={classes.titleContainer}>
        <Typography variant="h4">All Posts</Typography>
        <Typography variant="subtitle1"
                    className={classes.postCounts}>(Showing {start} - {end} posts
          of {count.totalPost} posts)</Typography>
      </div>
      <AddNewPost setPage={setPage}/>
    </div>
    <Divider className={classes.divider}/>
    <div className={classes.postContainer}>
      {posts.length ? posts.map((post, index) => <Post post={post} key={`${post.source}_${index}`}/>)
        : <PostSkeletons/>
      }
    </div>
    <Divider className={classes.divider}/>
    <div className={classes.paginationContainer}>
      <Typography variant="subtitle1">Page {page} of {count.page}</Typography>
      <Pagination count={count.page} page={page} onChange={(e, page) => setPage(page)}/>
      <div>-</div>
    </div>
  </div>
}

export default PostContainer
