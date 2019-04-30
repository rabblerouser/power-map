import React from 'react';
import { Route } from 'react-router-dom';
import Container from './container';

const Layout = () => (
  <>
    <Route path='/' exact component={Container} />
    <Route path='/power-map' component={Container} />
    <Route path='/power-map/:id' component={Container} />
  </>
);

export default Layout;
