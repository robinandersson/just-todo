import React, { useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthContext from './context/auth-context';
import ProtectedRoute from './helpers/ProtectedRoute';
import MainNavigation from './components/MainNavigation';

import AuthPage from './pages/AuthPage';
import TodosPage from './pages/TodosPage';
import PreferencesPage from './pages/PreferencesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [auth, setAuth] = useState(() => {
    if (!localStorage.hasOwnProperty('auth')) return {};
    try {
      return JSON.parse(localStorage.getItem('auth'));
    } catch (err) {
      console.log(err);
      localStorage.clear(); // reset localstorage, could be corrupt
    }
  });

  const login = (userId, username, token, tokenExpiration) => {
    // TODO: make use of tokenExpiration
    setAuth({ userId, username, token }); // set local state...
    // TODO: use cookies instead?
    localStorage.setItem('auth', JSON.stringify({ userId, username, token })); // ...and persist state
  };

  const logout = () => {
    setAuth(); // remove state...
    localStorage.clear(); // ...and remove local storage
  };

  const { userId, username, token } = auth || {};

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ userId, username, token, login, logout }}>
        <MainNavigation />
        <main className="mb-10 mx-8 flex flex-col flex-grow items-start">
          <Switch>
            {/* <Route path="/login" component={AuthPage} loggedInRedirectTo="/todos" />
            <Route path="/signup" component={AuthPage} loggedInRedirectTo="/todos" /> */}

            <Route
              path="/login"
              render={props => (
                <AuthPage {...props} authedRedirectTo="/todos" />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <AuthPage {...props} authedRedirectTo="/todos" />
              )}
            />

            <ProtectedRoute path="/todos" component={TodosPage} />
            <ProtectedRoute path="/preferences" component={PreferencesPage} />

            <Redirect path="/" to="/login" exact />
            <Route path="/" component={NotFoundPage} />
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
