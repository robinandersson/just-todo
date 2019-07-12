import React, { useContext } from 'react';

import AuthContext from '../context/auth-context';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const context = useContext(AuthContext);

  const componentToRender = props =>
    context.token ? (
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
