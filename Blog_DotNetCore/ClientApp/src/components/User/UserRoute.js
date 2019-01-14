import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { isNullOrUndefined } from 'util';

export const UserRoute = inject("userStore")(observer(({ component: Component, layout: Layout, ...rest }) => {
  // Add your own authentication on the below line.
  const isAuthenticated = isNullOrUndefined(rest.userStore.userData.username) ? false : true; 
  return (
    < Route {...rest} render={
      props =>
        isAuthenticated ? (
          <Layout {...rest}>
            <Component {...props} />
          </Layout>
        ) : (
            <Redirect to={{ pathname: '/user/signin', state: { from: props.location } }} />
          )
    }
    />
  );
}));

export default UserRoute;
