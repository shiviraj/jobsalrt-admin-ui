import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Modal, Typography} from "@material-ui/core";
import FormInput from "../../utils/FormInput";
import fetchApi from "../../../api/fetchApi";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '30%',
    left: '40%',
    "&>*": {
      margin: theme.spacing(1, 0)
    }
  },
}));

const AddNewPost = ({setPage}) => {
  const classes = useStyles();
  const [source, setSource] = useState("")
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    console.log(source)
    event.preventDefault()
    fetchApi({type: "ADD_POST", payload: {source}})
      .then(p => setPage(1))
      .catch(() => {
      })
    // setOpen(false)
  }

  return (<div className={classes.root}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Post</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className={classes.modal} onSubmit={handleSubmit}>
          <Typography variant="h5">Enter Post Source</Typography>
          <FormInput label="Source" value={source} onChange={setSource} required/>
          <Button type="submit" variant="contained" color="primary" fullWidth>Add Post</Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewPost
