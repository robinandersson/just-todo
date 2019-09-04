import React, { useState, useContext } from 'react';
import { backendRequest } from '../utils/request';
import { AuthError } from '../helpers/auth';

const AuthContext = React.createContext();

/*
 * The AuthContext provides access to authentication logic (signup, login),
 * as well as auth credentials (e.g. userId, token, etc.) if user is already logged in.
 *
 * Auth credentials are stored in localStorage to persist between browser sessions.
 */
const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // see if user was previously logged in (look through local storage)
    // TODO: make use of tokenExpiration
    if (!localStorage.hasOwnProperty('auth')) return {};
    try {
      return JSON.parse(localStorage.getItem('auth'));
    } catch (err) {
      console.log(err);
      localStorage.clear(); // reset localstorage, could be corrupt
    }
  });

  // logs user in on the frontend by setting credentials
  const loginFrontend = (userId, username, token, tokenExpiration) => {
    // TODO: make use of tokenExpiration
    setAuth({ userId, username, token }); // set local state...
    // TODO: use cookies instead?
    localStorage.setItem('auth', JSON.stringify({ userId, username, token })); // ...and persist state
  };

  // follow up to backend -login/-signup attempts (same logic for both). Observe the curry
  const authRequestFollowUp = queryEndpoint => res => {
    if (res.status !== 200 && res.status !== 201) throw new Error('Failed!');

    // check for errors
    return res.json().then(resData => {
      if (resData.errors)
        throw new AuthError(resData.errors[0].message, resData.errors[0].code);

      const { userId, username, token, tokenExpiration } = resData.data[
        queryEndpoint
      ];

      // sucessfull backend login/signup - follow it up with frontend login logic
      if (token) loginFrontend(userId, username, token, tokenExpiration);
      return resData.data[queryEndpoint];
    });
  };

  // attempts to login user (includes backend request and frontend logic).
  // returns a promise resolving with an object containing the user credentials (on successfull login) or throws error
  // detailing what went wrong.
  const login = (email, password) => {
    // graphql-query
    const queryEndpoint = 'login';

    const loginQuery = `query {
      ${queryEndpoint}(email: "${email}", password: "${password}") {
        userId
        username
        token
        tokenExpiration
      }
    }`;

    return backendRequest(loginQuery).then(authRequestFollowUp(queryEndpoint));
  };

  // attempts to signup user (includes backend request and frontend logic). Performs login if successfull.
  // returns a promise resolving with an object containing the user credentials (on successfull signup) r tohrows error
  // detailing what went wrong.
  const signup = (username, email, password, errorCallback) => {
    // graphql-query
    const queryEndpoint = 'createUser';

    const signupQuery = `mutation {
      ${queryEndpoint}(username: "${username}", email: "${email}", password: "${password}") {
        userId
        username
        token
        tokenExpiration
      }
    }`;

    return backendRequest(signupQuery).then(authRequestFollowUp(queryEndpoint));
  };

  // TODO: add function to determine if user is logged in? Instead of forcing consumers see if there's a token/userId.

  // logs out user from frontend.
  // function name explicitly states that there's only frontend logic just in case that will change in the future.
  const logoutFrontend = history => {
    setAuth(); // remove state...
    localStorage.clear(); // ...and remove local storage
    history.push('/login');
  };

  const { userId, username, token } = auth || {};

  return (
    <AuthContext.Provider
      value={{ userId, username, token, login, logout: logoutFrontend, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook for functional components
const useAuthContext = () => useContext(AuthContext);

export { AuthContext, AuthContextProvider, useAuthContext };
