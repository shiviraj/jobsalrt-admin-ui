import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider, Typography} from "@material-ui/core";
import Pagination from "../../components/Pagination";
import AddNewPost from "../editPost/AddNewPost";
import SortBy from "./SortBy";
import PostSkeleton from "../../components/PostSkeleton";
import Post from "./Post";


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
  noPost: {
    margin: theme.spacing(20),
    color: theme.palette.error.light
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: theme.spacing(2)
  },
  divider: {marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}
}));

const TitleBar = ({page, count}) => {
  const classes = useStyles()

  const limit = 48
  const start = (page - 1) * limit + 1;
  const end = (page * limit) > count.totalPost ? count.totalPost : page * limit;

  return <div className={classes.titleContainer}>
    <Typography variant="h4">All Posts</Typography>
    <Typography variant="subtitle1" className={classes.postCounts}>
      (Showing {start} - {end} posts of {count.totalPost} posts)
    </Typography>
  </div>
}

const PostContainer = ({posts, page, setPage, count, sort, setSort}) => {
  const classes = useStyles()

  return <div className={classes.root}>
    <div className={classes.titleContainer}>
      <TitleBar page={page} count={count}/>
      <AddNewPost setPage={setPage}/>
    </div>
    <SortBy sort={sort} setSort={setSort}/>
    <Divider className={classes.divider}/>

    <div className={classes.postContainer}>
      {!posts && Array(12).fill("").map((_, index) => <PostSkeleton key={`key-${index}`}/>)}
      {posts && posts.length
        ? posts.map((post, index) => <Post post={post} key={`${post.source}_${index}`}/>)
        : <Typography variant="h1" className={classes.noPost}>No Post Found...</Typography>}
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
