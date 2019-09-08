import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { AuthContextProvider } from './context/auth-context';
import { NotificationCenterProvider } from './context/notification-context';

import ProtectedRoute from './utils/ProtectedRoute';
import MainNavigation from './components/MainNavigation';

import AuthPage from './pages/AuthPage';
import TodosPage from './pages/TodosPage';
import PreferencesPage from './pages/PreferencesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <NotificationCenterProvider>
        <AuthContextProvider>
          <MainNavigation />
          <main className="mb-10 mx-6 flex flex-col flex-grow items-start">
            <Switch>
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
        </AuthContextProvider>
      </NotificationCenterProvider>
    </BrowserRouter>
  );
}

export default App;
