import React from 'react';

const GlobalContext = React.createContext({
  loggedInUserData: null,
  setLoggedInUserData: () => {},
});

export default GlobalContext;
