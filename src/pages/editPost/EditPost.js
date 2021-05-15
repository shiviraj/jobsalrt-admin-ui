import React, {useEffect, useState} from 'react'
import fetchApi from "../../api/fetchApi";
import {Button, Divider, makeStyles, Typography} from "@material-ui/core";
import PostOptions from "./PostOptions";
import EditRawPost from "./EditRawPost";
import EditTextPost from "./EditTextPost";
import EditPostSkeleton from "../../components/EditPostSkeleton";


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
  postContainer: {
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
  toggle: {
    marginLeft: theme.spacing(2)
  }
}));

const EditPost = ({match}) => {
  const url = match.params.url

  const classes = useStyles()
  const [post, setPost] = useState(null)
  const [active, setActive] = useState({key: "basicDetails", name: "Basic Details"})
  const [rawPost, setRawPost] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)


  useEffect(() => {
    setIsLoading(true)
    fetchApi({type: "GET_POST", payload: {url}})
      .then(p => setPost(p))
      .catch(e => ({}))
    .then(() => setIsLoading(false))
  }, [url])


  const triggerSubmit = () => {
    fetchApi({type: "UPDATE_POST", payload: {url, post}})
      .then(p => setPost(p))
      .catch(e => {
      })
  }

  if (isLoading) return <EditPostSkeleton/>

  return (<div className={classes.root}>

      <div className={classes.postContainer}>
        <div className={classes.titleContainer}>
          <div className={classes.titleContainer}>
            <Typography variant="h5">{active.name || "Post Details"}</Typography>
            <Button variant="contained" color="primary" className={classes.toggle} onClick={() => setRawPost(!rawPost)}>
              {rawPost ? "Edit as Text" : "Edit as json"}
            </Button>
          </div>
          <Button variant="contained" color="primary" component="a" href={post.source} target="_blank">View Post
            Source</Button>
        </div>
        <Divider className={classes.divider}/>
        {
          rawPost
            ? <EditRawPost post={post} setPost={setPost}/>
            : <EditTextPost active={active} post={post} setPost={setPost} triggerSubmit={triggerSubmit}/>
        }
      </div>

      <PostOptions setActive={setActive}/>
    </div>
  )
}

export default EditPost
