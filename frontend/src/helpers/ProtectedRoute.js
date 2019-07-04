import React, { useContext } from 'react';

import AuthContext from '../context/auth-context';
import { Route, Redirect } from 'react-router-dom';


const ProtectedRoute = ({ component: Component, ...rest }) => {

  const context = useContext(AuthContext);

  const compToRender = props => context.token ?
    <Component { ...props } /> :
    <Redirect
      to={{
        pathname: '/login',
        state: {
          from: { ...props.location,
            unauthorizedRedirect: true,
            },
        },
      }}
    />

  return <Route { ...rest } render={ compToRender } />;
};

export default ProtectedRoute;