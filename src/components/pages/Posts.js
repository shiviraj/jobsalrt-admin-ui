import React, {useEffect, useState} from 'react'
import fetchApi from "../../api/fetchApi";
import Post from "../utils/Post";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme/theme";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: theme.spacing(1)
  },
  active: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    borderBottom: `3px solid ${theme.palette.primary.dark}`,
  }
});

const Posts = () => {
  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchApi({type: "GET_POSTS", payload: {page}})
      .then(p => setPosts(p))
      .catch(e => {
      })
  }, [page])

  return <div className={classes.root}>
      {posts.map((post) => <Post post={post} key={post.source}/>)}
  </div>
}

export default Posts
