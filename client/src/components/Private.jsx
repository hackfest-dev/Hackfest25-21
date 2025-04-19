import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAuthFetch from '../hooks/useAuthFetch';
import { removeToken } from '../utils/authToken';

const Private = ({ children }) => {
  const { logoutUser, loginUser } = useContext(AuthContext);
  const { get } = useAuthFetch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // to show loader while checking

  useEffect(() => {
    const verifyUser = async () => {
      const baseURL = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await get(baseURL + '/user/'); // protected route
        console.log(res);
        
        if (res.auth) {
          loginUser(res.userProfile.walletAddress, res.userProfile.role, true);
          setLoading(false);
        } else {
          logoutUser();
          navigate('/login');
        }
      } catch (err) {
        logoutUser();
        removeToken();
        navigate('/login');
      }
    };

    verifyUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default Private;
