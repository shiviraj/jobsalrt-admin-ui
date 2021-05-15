import React from 'react';
import {Route, Switch} from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import HomeRoute from "./HomeRoute";
import Login from "../pages/Login";
import Posts from "../pages/posts/Posts";
import EditPost from "../pages/editPost/EditPost";

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} exact/>
      <PrivateRoute path="/" component={HomeRoute} exact/>
      <PrivateRoute path="/posts" component={Posts} exact/>
      <PrivateRoute path="/posts/:url" component={EditPost} exact/>
    </Switch>
  );
};

export default AppRoutes;
