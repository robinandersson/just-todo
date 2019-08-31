import React from 'react';

// set up context defaults
export default React.createContext({
  // Make sure the shape of the default values passed to
  // createContext matches the shape that the consumers expect!
  userId: null,
  username: null,
  token: null,
  login: (userId, username, token, tokenExpiration) => {},
  logout: () => {},
});
