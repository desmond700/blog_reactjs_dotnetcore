import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, layout: Layout, ...rest }) => {
  // Add your own authentication on the below line.
  const isAuthenticated = window.sessionStorage.getItem("admin_isLoggedIn") || false;
  return (
    < Route {...rest} render={
      props =>
        isAuthenticated ? (
          <Layout>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect to={{ pathname: '/admin/login', state: { from: props.location } }} />
          )
       }
    />
   )
};

export default AdminRoute;
