import React from 'react';

export default React.createContext({
  userId: null,
  username: null,
  token: null,
  login: (userId, username, token, tokenExpiration) => {},
  logout: () => {},
});