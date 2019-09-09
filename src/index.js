import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import Container from "./nav/container";
import { Route } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Route path='/' exact component={Container} />
    <Route path='/power-map/:id?' component={Container} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
