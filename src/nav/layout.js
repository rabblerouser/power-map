import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Container from "./container";
import Login from "../auth/login";
import AuthRoute from "../auth/authRoute";

const Layout = () => (
  <Router>
    <AuthRoute path='/' exact component={Container} />
    <AuthRoute path='/power-map/:id?' component={Container} />
    <Route path='/login' component={Login} />
  </Router>
);

export default Layout;
