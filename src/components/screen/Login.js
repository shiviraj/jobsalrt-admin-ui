import React, {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import FormInput from '../utils/FormInput';
import fetchApi from '../../api/fetchApi';
import {Button, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column"
  },
  primaryButton: {
    visibility: "hidden"
  },
  button: {
    alignSelf: "center",
    width: '30%',
    marginTop: theme.spacing(1),
    visibility: "visible"
  },
  error: {color: "red"}
}));

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  const rootRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchApi({type: 'SIGN_IN', payload: {email, password}})
      .then((u) => history.push('/'))
      .catch(() => setError('Something went wrong, try again!!'));
  };

  return (<div className={classes.root} ref={rootRef}>
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open
      className={classes.modal}
      container={() => rootRef.current}
    >
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Typography variant="h5">Log In</Typography>
        <Typography variant="subtitle1" className={classes.error}>{error ? error : ''}</Typography>
        <FormInput type="email" label="Email" onChange={setEmail} required/>
        <FormInput type="password" label="Password" onChange={setPwd} required/>
        <Button variant="contained" size="large" color="primary" className={classes.button}
                disabled={email === "" || password === ""} type="submit">Log In</Button>
      </form>
    </Modal>
  </div>)
}

export default Login;
