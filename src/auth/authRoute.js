import React from 'react';
import { Route, Redirect } from 'react-router-dom'

import { authentication } from '../service/authentication';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentUser = authentication.currentUserValue;
      if (!currentUser) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
        )
      }
      return <Component {...props} />
    }}
  />
);

export default AuthRoute;
