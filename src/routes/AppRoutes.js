import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import HomeRoute from "./HomeRoute";
import Login from "../components/screen/Login";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} exact/>
      <PrivateRoute path="/" component={HomeRoute} exact/>
    </Switch>
  );
};

export default AppRoutes;
