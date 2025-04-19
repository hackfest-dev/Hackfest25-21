import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { getToken } from '../utils/authToken';

const useAuthFetch = () => {
  const { userData } = useContext(AuthContext);

  const authFetch = async (url, method = 'GET', body = null, customOptions = {}) => {
    try {
    const token = getToken() 
    console.log(token,"token");

    if (!token) {
      console.log("not ");
      
      throw new Error('No auth token found');
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
      ...(method !== 'GET' && method !== 'HEAD' ? { 'Content-Type': 'application/json' } : {}),
      ...customOptions.headers
    };

    const config = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
      ...customOptions
    };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Request failed');
      }

      return data;
    } catch (err) {
      console.log(err);
      console.error(`Auth fetch [${method}] error:`, err);
      return { auth:false }
    }
  };

  return {
    get: (url, options = {}) => authFetch(url, 'GET', null, options),
    post: (url, body, options = {}) => authFetch(url, 'POST', body, options),
    patch: (url, body, options = {}) => authFetch(url, 'PATCH', body, options),
    // You can add delete, put, etc. similarly
  };
};

export default useAuthFetch;
