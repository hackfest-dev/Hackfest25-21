// AuthProvider.js
import React, { useState } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const initData = {
    walletAddress:"",
    role:"",
    contract:null,
    auth:false
  }

  const [userData, setUserData] = useState(initData); 

  const loginUser = (walletAddress= "",role = "",contract=null,auth=false) => {
    setUserData({ walletAddress,role,auth,contract }); 
  };

  const logoutUser = () => {
    setUserData(initData); 
  };

  return (
    <AuthContext.Provider value={{ userData, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
