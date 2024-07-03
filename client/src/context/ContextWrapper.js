import React, { useEffect, useState } from 'react';
import axios from 'axios';

import GlobalContext from './GlobalContext';
import { getUsername } from '../utils/helpers';

const ContextWrapper = (props) => {
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const { username } = await getUsername();
      const { data } = await axios.get(`/api/auth/user/${username}`);
      setLoggedInUserData(data);
    };

    fetchLoggedInUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        loggedInUserData,
        setLoggedInUserData,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
