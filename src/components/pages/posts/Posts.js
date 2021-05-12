import React, {useEffect, useState} from 'react'
import fetchApi from "../../../api/fetchApi";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../../theme/theme";
import PostContainer from "./PostContainer";
import FilterContainer from "./FilterContainer";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
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
    <PostContainer posts={posts} page={page} setPage={setPage} totalPages={10}/>
    <FilterContainer/>
  </div>
}

export default Posts
