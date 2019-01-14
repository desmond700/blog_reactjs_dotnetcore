import React from 'react';
//import AuthService from './Services/AuthService';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = true;//AuthService.isLoggedIn()

  return (
    <Route
      {...rest}
      component={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: 'admin/login', state: { from: props.location } }} />
          )
      }
    />
  );
};

export default PrivateRoute;
