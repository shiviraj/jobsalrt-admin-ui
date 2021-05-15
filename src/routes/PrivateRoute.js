import React, {useEffect, useState} from 'react';
import fetchApi from '../api/fetchApi';
import UserContext from "../context/UserContext";
import {Route, useHistory} from "react-router-dom"

const AuthRouteWithUser = ({user, setUser, Component, ...rest}) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchApi({type: 'GET_USER'})
      .then(u => setUser(u))
      .catch(() => {
        setUser(null)
        history.push("/login")
      })
      .then(() => setIsLoading(false))
  }, [history, setUser])

  return (isLoading) ? <></> : (<Route {...rest}/>)
};

const AuthRoute = (props) => {
  return (
    <UserContext.Consumer>{({user, setUser}) =>
      (<AuthRouteWithUser {...props} user={user} setUser={setUser}/>)
    }</UserContext.Consumer>
  )
};

export default AuthRoute;
