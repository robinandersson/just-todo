import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

import AuthContext from '../context/auth-context';
import { AuthError } from '../helpers/auth';
import ToastNotificationList from '../components/notifications/ToastNotificationList';
import { SERVER_URL, GRAPHQL_ROUTE } from '../helpers/url';

class AuthPage extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      isLoginPath: props.location.pathname === '/login',
      username: '',
      email: '',
      password: '',
      notifications: [],
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
      this.showNotification({
        type: 'error',
        message:
          'You need to be logged in to view the page you tried to access',
      });
    }

    // show signup info when first landing on signup
    this.ensureSignupNotification();
  }

  componentDidUpdate() {
    // show signup info when switching to signup
    this.ensureSignupNotification();
  }

  handleInputChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { username, email, password } = this.state;

    // TODO: handle incorrect credentials correctly
    if (email.trim().length === 0 || password.trim().length === 0) return;

    const query = this.state.isLoginPath
      ? `query {
        login(email: "${email}", password: "${password}") {
          userId
          username
          token
          tokenExpiration
        }
      }`
      : `mutation {
        createUser(username: "${username}", email: "${email}", password: "${password}") {
          userId
          username
          token
          tokenExpiration
        }
      }`;

    fetch(`${SERVER_URL}${GRAPHQL_ROUTE}`, {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Failed!');
        return res.json();
      })
      .then(resData => {
        if (resData.errors)
          throw new AuthError(
            resData.errors[0].message,
            resData.errors[0].code
          );

        const queryEndpoint = this.state.isLoginPath ? 'login' : 'createUser';

        const {
          userId,
          username: loginUsername,
          token,
          tokenExpiration,
        } = resData.data[queryEndpoint];

        if (token)
          this.context.login(userId, loginUsername, token, tokenExpiration);
      })
      .catch(err => {
        this.showNotification({
          type: 'error',
          message: err.message,
        });
        return err;
      });
  };

  removeToast = index => {
    const newNotifications = [...this.state.notifications];

    delete newNotifications[index];

    this.setState({ notifications: newNotifications });
  };

  showNotification(notification) {
    this.setState({
      notifications: [...this.state.notifications, notification],
    });
  }

  ensureSignupNotification() {
    if (!this.state.isLoginPath && !this.signupNotificationSent) {
      this.showNotification({
        type: 'info',
        duration: 10000,
        heading: 'About that email',
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
    if (this.context.token)
      return <Redirect to={this.props.authedRedirectTo} />;

    const loginHint = (
      <p className="text-xs mt-5">
        New user?
        <NavLink to="/signup" className="text-blue-700 hover:text-blue-900">
          &nbsp;Signup
        </NavLink>
        &nbsp;instead!
      </p>
    );

    const signupHint = (
      <p className="text-xs mt-5">
        Existing user?
        <NavLink to="/login" className="text-blue-700 hover:text-blue-900">
          &nbsp;Login
        </NavLink>
        &nbsp;instead!
      </p>
    );

    const usernameInput = (
      <React.Fragment>
        <label htmlFor="email" className="input-label">
          Username
        </label>
        <input
          name="username"
          type="text"
          required
          className="text-input"
          onChange={this.handleInputChange}
          value={this.state.username}
        />
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <ToastNotificationList
          removeToast={this.removeToast}
          notifications={this.state.notifications}
        />

        <form
          className="container form self-start"
          onSubmit={this.handleSubmit}
        >
          {!this.state.isLoginPath && usernameInput}
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="text-input"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="text-input tracking-widest"
            onChange={this.handleInputChange}
            value={this.state.password}
          />
          <div>
            <button
              type="submit"
              className={
                'btn mt-5 mb-2 py-1 px-3' +
                (!this.state.isLoginPath ? ' mode--positive' : '')
              }
            >
              {this.state.isLoginPath ? 'Login' : 'Signup'}
            </button>

            {this.state.isLoginPath ? loginHint : signupHint}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AuthPage;
