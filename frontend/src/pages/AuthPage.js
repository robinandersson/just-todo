import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthContext } from '../contexts/auth-context';
import { withNotificationCenter } from '../contexts/notification-context';
import AuthForm from '../components/forms/AuthForm';

/*
 * Page for displaying login/signup
 *
 */
// TODO: refactor to let all state and logic belong to AuthForm (like TodosPage)
class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoginPath: props.location.pathname === '/login',
    };

    this.signupNotificationSent = false;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isLoginPath: nextProps.location.pathname === '/login' });
  }

  componentDidMount() {
    const isUnauthorizedRedirect =
      this.props.location.state &&
      this.props.location.state.from &&
      this.props.location.state.from.unauthorizedRedirect;

    if (isUnauthorizedRedirect) {
      this.props.notificationCenter.pushNotification({
        type: 'error',
        heading: 'Please login',
        message:
          'You need to be authenticated to view the page you tried to access',
      });
    }

    // show signup info when first landing on signup
    this.ensureSignupNotification();
  }

  componentDidUpdate() {
    // show signup info when switching to signup for the first time
    this.ensureSignupNotification();
  }

  handleAuthFormSubmit = ({ username, email, password }) => {
    const isLoginPath = this.state.isLoginPath; // declare to be used with async (path may change)

    // (too) simple guard, doesn't allow empty inputs (or only white spaces)
    // TODO: handle incorrect credentials correctly/better
    if (
      (!isLoginPath && username.trim().length === 0) ||
      email.trim().length === 0 ||
      password.trim().length === 0
    )
      return;

    // attempt login or signup (determined by route pathname)
    const loginOrSignupPromise = isLoginPath
      ? this.context.login(email, password)
      : this.context.signup(username, email, password);

    return loginOrSignupPromise.catch(err => {
      this.props.notificationCenter.pushNotification({
        type: 'error',
        heading: isLoginPath ? 'Login error' : 'Signup error',
        message: err.message,
        limitTo: [this.props.location.pathname],
      });

      return err;
    });
  };

  // checks if signup-notification has been sent, sends it if not
  ensureSignupNotification() {
    if (!this.state.isLoginPath && !this.signupNotificationSent) {
      this.props.notificationCenter.pushNotification({
        type: 'info',
        duration: 10000,
        heading: 'About that email field',
        message: (
          <>
            <p>
              This is merely a demo, so don't worry about entering your{' '}
              <b>email</b>.
            </p>
            <p>
              - it is only used as a login credential (no account confirmation
              email will be sent, etc.).
            </p>
          </>
        ),
      });

      this.signupNotificationSent = true;
    }
  }

  render() {
    // TODO: don't handle redirects here? Handle it in App.js?
    if (this.context.token)
      return <Redirect to={this.props.authedRedirectTo} />;

    return (
      <AuthForm
        handleSubmit={this.handleAuthFormSubmit}
        isLoginPath={this.state.isLoginPath}
      />
    );
  }
}

export default withNotificationCenter(AuthPage);
