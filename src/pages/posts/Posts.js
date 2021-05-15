import React, {useCallback, useEffect, useState} from 'react'
import fetchApi from "../../api/fetchApi";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../../theme/theme";
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
  const [posts, setPosts] = useState(null)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState({})
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({sortBy: "createdAt", sortOrder: "desc"})


  const getSelectedFilters = useCallback(() => {
    return Object.keys(filters).reduce((selectedFilters, keyName) => {
      selectedFilters[keyName] = filters[keyName].map(opt => opt.value)
      return selectedFilters
    }, {});
  }, [filters])

  useEffect(() => {
    fetchApi({type: "GET_POSTS_PAGE_COUNT", payload: {filters: getSelectedFilters(), ...sort}})
      .then(p => setPageCount(p))
      .catch(e => {
      })
  }, [filters, getSelectedFilters, sort.sortBy, sort.sortOrder])

  useEffect(() => {
    setPosts(null)
    // fetchApi({type: "GET_POSTS", payload: {page, filters: getSelectedFilters(), ...sort}})
    //   .then(p => setPosts(p))
    //   .catch(e => {
    //   })
  }, [page, filters, getSelectedFilters, sort.sortBy, sort.sortOrder])

  return <div className={classes.root}>
    <PostContainer posts={posts} page={page} setPage={setPage} count={pageCount} sort={sort} setSort={setSort}/>
    <FilterContainer applyFilter={setFilters}/>
  </div>
}

export default Posts
