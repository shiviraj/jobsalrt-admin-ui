import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import HomeRoute from "./HomeRoute";
import Login from "../components/pages/Login";
import Posts from "../components/pages/Posts";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} exact/>
      <PrivateRoute path="/" component={HomeRoute} exact/>
      <PrivateRoute path="/posts" component={Posts} exact/>
    </Switch>
  );
};

export default AppRoutes;
