import React from "react";
import {Divider, Typography} from "@material-ui/core";
import Post from "./Post";
import {makeStyles} from "@material-ui/core/styles";
import {Pagination} from '@material-ui/lab'


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
    marginLeft: theme.spacing(4)
  },
  postCounts: {
    marginLeft: theme.spacing(2)
  },
  sortBy: {marginRight: theme.spacing(2)},
  tabs: {
    width: theme.spacing(1)
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

const PostContainer = ({posts, page, setPage, totalPages}) => {
  const classes = useStyles()
  return <div className={classes.root}>
    <div className={classes.titleContainer}>
      <Typography variant="h4">All Posts</Typography>
      <Typography variant="subtitle1" className={classes.postCounts}>(Showing 1-50 posts of 250 posts)</Typography>
    </div>
    <div className={classes.postContainer}>
      {posts.map((post, index) => <Post post={post} key={`${post.source}_${index}`}/>)}
    </div>
    <Divider/>
    <div className={classes.paginationContainer}>
      <Typography variant="subtitle1">Page {page} of {totalPages}</Typography>
      <Pagination count={10} page={page}
                  color="primary"
                  onChange={(e, page) => setPage(page)} showFirstButton
                  showLastButton/>
      <div>-</div>
    </div>
  </div>
}

export default PostContainer
