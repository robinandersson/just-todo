import { backendRequest } from '../utils/request';

// TODO: share code between backend and frontend somehow? (this is duplicated on the frontend)
class AuthError extends Error {
  constructor(msg, code) {
    super(msg);
    this.code = code;
  }
}

const attemptLogin = (email, password) => {
  const loginQuery = `query {
    login(email: "${email}", password: "${password}") {
      userId
      username
      token
      tokenExpiration
    }
  }`;

  return backendRequest(loginQuery);
};

const attemptSignup = (username, email, password) => {
  const signupQuery = `mutation {
    createUser(username: "${username}", email: "${email}", password: "${password}") {
      userId
      username
      token
      tokenExpiration
    }
  }`;
  return backendRequest(signupQuery);
};

export { AuthError, attemptLogin, attemptSignup };
