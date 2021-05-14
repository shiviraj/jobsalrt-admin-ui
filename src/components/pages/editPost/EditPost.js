import React, {useEffect, useState} from 'react'
import fetchApi from "../../../api/fetchApi";
import {makeStyles} from "@material-ui/core";
import PostView from "./PostView";
import PostOptions from "./PostOptions";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    backgroundColor: theme.palette.grey[300]
  },
}));

const EditPost = (props) => {
  const url = props.match.params.url

  const classes = useStyles()
  const [post, setPost] = useState(null)
  const [active, setActive] = useState({key: "basicDetails", name: "Basic Details"})


  useEffect(() => {
    fetchApi({type: "GET_POST", payload: {url}})
      .then(p => setPost(p))
      .catch(e => {
      })
  }, [url])


  const triggerSubmit = () => {
    fetchApi({type: "UPDATE_POST", payload: {url, post}})
      .then(p => setPost(p))
      .catch(e => {
      })
  }

  if (!post) return <></>

  return (
    <div className={classes.root}>
      <PostView active={active} post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>
      <PostOptions setActive={setActive}/>
    </div>
  )
}

export default EditPost
