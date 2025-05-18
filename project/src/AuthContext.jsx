import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedUserId = localStorage.getItem('userId');

    if (token && savedUser && savedUserId) {
      setUser(JSON.parse(savedUser));
      setUserId(Number(savedUserId));
    } else {
      setUser(null);
      setUserId(null);
    }

    setLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    setUser(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId,
        loading,
        setUser,
        setUserId,
        logout, // <<--- Export logout function
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
