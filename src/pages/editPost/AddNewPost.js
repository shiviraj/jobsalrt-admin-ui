import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Modal, Typography} from "@material-ui/core";
import FormInput from "../../components/FormInput";
import fetchApi from "../../api/fetchApi";
import ButtonWithLoader from "../../components/ButtonWithLoader";

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
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsLoading(true)
    fetchApi({type: "ADD_POST", payload: {source}})
      .then(p => {
        setOpen(false)
        setPage(1)
      })
      .catch(() => ({}))
      .then(() => setIsLoading(false))
  }

  return (<div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Post</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form className={classes.modal} onSubmit={handleSubmit}>
          <Typography variant="h5">Enter Post Source</Typography>
          <FormInput label="Source" value={source} onChange={setSource} required/>
          <ButtonWithLoader isLoading={isLoading} type="submit" variant="contained" color="primary" fullWidth>
            Add Post
          </ButtonWithLoader>
        </form>
      </Modal>
    </div>
  );
};

export default AddNewPost
