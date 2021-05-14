import React, {useEffect, useState} from 'react';
import fetchApi from '../api/fetchApi';
import UserContext from "../context/UserContext";
import {Route, useHistory} from "react-router-dom"

const AuthRouteWithUser = ({user, setUser, Component, ...rest}) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchApi({type: 'GET_USER'})
      .then(u => {
        setUser(u)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        setUser(null)
        history.push("/login")
      })
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
