import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Link, TextField, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: 'center',
    alignItems: "center"
  },
  errorBox: {
    textAlign: "center",
    height: theme.spacing(4),
  },
  saveButton: {margin: theme.spacing(1, 2)},
  textArea: {
    width: "95%",
    margin: theme.spacing(2),
    backgroundColor: theme.palette.grey[300]
  }
}))

const EditRawPost = ({post, setPost}) => {
  const {id, source, createdAt, postUpdateAt, totalView, ...rest} = post
  const classes = useStyles()
  const [editablePost, updatePost] = useState(JSON.stringify(rest, null, 8))
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      JSON.parse(editablePost)
      setError(false)
    } catch (e) {
      setError(true)
    }
  }, [editablePost])

  const handleUpdate = () => {
    setPost(Object.assign(post, JSON.parse(editablePost)))
  }

  return <div>
    <Box className={classes.errorBox}>
      {error ? <Typography color="error" variant="h6">JSON Formatting Error...</Typography>
        : <Typography variant="h6">{""}</Typography>}
    </Box>
    <div className={classes.root}>
      <Button variant="contained" color="primary" className={classes.saveButton} disabled={error}
              onClick={handleUpdate}>Save</Button>
      <Link target="_blank" href={"https://jsonformatter.curiousconcept.com/"}>Online Json Formatter</Link>
    </div>
    <div className={classes.root}>
      <TextField className={classes.textArea} value={editablePost} variant="outlined" autoFocus multiline
                 onChange={(event) => updatePost(event.target.value)}
      />
    </div>
  </div>
}

export default EditRawPost
