
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const fetchUserDetails = async (token) => {
  try {
    const response = await axios.get("http://localhost:5500/api/auth/validate-token", {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.user; // Assuming the server responds with user data on successful token validation
  } catch (error) {
    console.error("Failed to fetch user details", error);
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails(token).then(userData => {
        if (userData) {
          setUser(userData); // Set user data upon successful validation
        } else {
          localStorage.removeItem('token');
        }
      });
    }
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('role', userData.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Successfully logged out!', { autoClose: 2000 }); // Add toast notification for logout
  };

  return (
    <UserContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
