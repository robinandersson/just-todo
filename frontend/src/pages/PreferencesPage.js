import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import AuthContext from '../context/auth-context';
import InputField from '../components/InputField';

const {
  REACT_APP_SERVER_URL: SERVER_URL,
  REACT_APP_GRAPHQL_ROUTE: GRAPHQL_ROUTE,
} = process.env;

class PreferencesPage extends Component {
  static contextType = AuthContext;

  state = {
    username: '',
    email: '',
    newPassword: '',
    repeatPassword: '',
    errorMessage: '',
    isLoading: false,
  };

  //TODO: store all userdata when first logging in (along with username, id, etc.?)

  componentWillMount() {
    // TODO: refactor all fetches to a generic fetch function
    fetch(`${SERVER_URL}${GRAPHQL_ROUTE}`, {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            user(id: ${this.context.userId}) {
              username
              email
            }
          }
        `,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 200)
          throw new Error('Fetching user data failed!');

        return res.json();
      })
      .then(resData => {
        const { username, email } = resData.data.user;
        this.setState({ username, email });
      })
      .catch(err => {
        console.log(err);
        return err;
      });
  }

  isReadyToSubmit = () =>
    !!(
      this.state.newPassword &&
      this.state.newPassword === this.state.repeatPassword
    );

  handleUserPrefUpdate = evt => {
    evt.preventDefault();

    const { newPassword, repeatPassword } = this.state;

    // check repeated password match
    if (!newPassword || newPassword !== repeatPassword) {
      this.setState({ errorMessage: "Passwords doesn't match!" });
      return;
    }

    this.setState({ isLoading: true });

    fetch(`${SERVER_URL}${GRAPHQL_ROUTE}`, {
      method: 'POST',
      body: JSON.stringify({
        query: `
          mutation {
            updateUser(password: "${newPassword}") {
              id
            }
          }
        `,
      }),
      headers: {
        'Content-type': 'Application/json',
        Authorization: `Bearer ${this.context.token}`,
      },
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Failed to update user preferences!');
        return res.json();
      })
      .then(resData => {
        if (resData.errors)
          throw new Error('Failed to update user preferences!');
      })
      .catch(err => {
        console.log(err);
        return err;
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  onPasswordChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  render() {
    // setInterval(() => {
    //   this.setState({ isLoading: !this.state.isLoading });
    // }, 1000);

    return (
      <form className="container form" onSubmit={this.handleUserPrefUpdate}>
        <label htmlFor="">Username</label>
        <InputField
          name="username"
          type="text"
          className="text-input"
          value={this.state.username}
          disabled
        />

        <label className="input-label" htmlFor="email">
          Email
        </label>
        <InputField
          name="email"
          type="text"
          className="text-input"
          value={this.state.email}
          disabled
        />

        <label className="input-label" htmlFor="new-password">
          New Password
        </label>
        <input
          className="text-input tracking-widest"
          name="newPassword"
          type="password"
          value={this.state.newPassword}
          onChange={this.onPasswordChange}
        />

        <label className="input-label" htmlFor="repeat-password">
          Repeat Password
        </label>
        <input
          className="text-input tracking-widest"
          name="repeatPassword"
          type="password"
          value={this.state.repeatPassword}
          onChange={this.onPasswordChange}
        />
        <div className="mt-5 mb-2 flex items-center">
          <button
            type="submit"
            className="btn mode--positive py-1 px-3"
            disabled={!this.isReadyToSubmit()}
          >
            Update
          </button>

          <div
            className={'transition' + (!this.state.isLoading ? ' scale' : '')}
          >
            <FontAwesomeIcon
              icon={faCog}
              className={
                'ml-2 text-green-400 transition mode--instant spin' +
                (!this.state.isLoading ? ' opacity-100' : ' opacity-0')
              }
              size="2x"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default PreferencesPage;
