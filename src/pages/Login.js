import React, {useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import FormInput from '../components/FormInput';
import fetchApi from '../api/fetchApi';
import {Typography} from "@material-ui/core";
import ButtonWithLoader from "../components/ButtonWithLoader";

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
  button: {
    marginTop: theme.spacing(1),
  },
  error: {color: "red"}
}));

const Login = () => {
  const history = useHistory();
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false)
  const rootRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)
    fetchApi({type: 'SIGN_IN', payload: {email, password}})
      .then((u) => {
        localStorage.setItem("token", JSON.stringify(u))
        history.push('/')
      })
      .catch(() => {
        setError('Something went wrong, try again!!')
        setIsLoading(false)
      });
  };

  return (<div className={classes.root} ref={rootRef}>
    <Modal
      open
      className={classes.modal}
      container={() => rootRef.current}
    >
      <form className={classes.paper} onSubmit={handleSubmit}>
        <Typography variant="h5">Log In</Typography>
        <Typography variant="subtitle1" className={classes.error}>{error ? error : ''}</Typography>
        <FormInput type="email" label="Email" onChange={setEmail} autoFocus required/>
        <FormInput type="password" label="Password" onChange={setPwd} required/>
        <ButtonWithLoader isLoading={isLoading} variant="contained" size="large" color="primary"
                          className={classes.button} fullWidth
                          disabled={email === "" || password === ""} type="submit">Log In</ButtonWithLoader>
      </form>
    </Modal>
  </div>)
}

export default Login;
