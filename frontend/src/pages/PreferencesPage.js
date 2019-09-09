import React, { Component } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { withNotificationCenter } from '../contexts/notification-context';
import UserPreferencesForm from '../components/forms/UserPreferencesForm';

class PreferencesPage extends Component {
  static contextType = AuthContext;

  state = {
    username: '',
    email: '',
    isUpdating: false,
    updateSuccessful: null,
  };

  //TODO: store all userdata when first logging in (along with username, id, etc.?)
  componentWillMount() {
    // attempt request for fetching user preferences, handle follow up and potential errors
    this.context
      .authedRequest(
        ` query {
            user(id: ${this.context.userId}) {
              username
              email
            }
          }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 200)
          throw new Error('Fetching your user data failed! :O');
        return res.json();
      })
      .then(resData => {
        if (!resData.data || !resData.data.user)
          throw new Error('Fetching your user data failed :O');
        const { username, email } = resData.data.user;
        this.setState({ username, email });
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      });
  }

  handlePreferencesUpdate = ([newPassword, repeatedPassword]) => {
    // check repeated password match (this should never happen)
    if (!newPassword || newPassword !== repeatedPassword) {
      // send error notification and cancel update
      this.props.notificationCenter.pushNotification({
        type: 'error',
        heading: 'Update Failed',
        message: "Password fields doesn't match!",
      });
      return;
    }

    this.setState({ isUpdating: true, updateSuccessful: false });

    // attempt user update request, handle follow up and potential errors
    this.context
      .authedRequest(
        ` mutation {
            updateUser(password: "${newPassword}") {
              id
            }
          }`
      )
      .then(res => {
        if (res.status !== 200 && res.status !== 201)
          throw new Error('Failed to update user preferences!');
        return res.json();
      })
      .then(resData => {
        if (resData.errors)
          throw new Error('Failed to update user preferences!');
        this.setState({ updateSuccessful: true });
      })
      .catch(err => {
        this.props.notificationCenter.pushNotification({
          type: 'error',
          heading: 'Something went wrong',
          message: err.message,
        });
        return err;
      })
      .finally(() => this.setState({ isUpdating: false }));
  };

  render() {
    return (
      <UserPreferencesForm
        username={this.state.username}
        email={this.state.email}
        onSubmit={this.handlePreferencesUpdate}
        isSubmitting={this.state.isUpdating}
        submitSuccessful={this.state.updateSuccessful}
      />
    );
  }
}

export default withNotificationCenter(PreferencesPage);
