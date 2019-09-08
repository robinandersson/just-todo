import React from 'react';

import { useAuthContext } from '../contexts/auth-context';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authContext = useAuthContext();

  const componentToRender = props =>
    authContext.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: { ...props.location, unauthorizedRedirect: true },
          },
        }}
      />
    );

  return <Route {...rest} render={componentToRender} />;
};

export default ProtectedRoute;
