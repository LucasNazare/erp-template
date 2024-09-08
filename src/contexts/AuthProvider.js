import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext()

// Controla o estado de autenticação do usuário
export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useContext(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // TODO: Validate token with API
        setIsLogged(true);
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }
    }
  }, []);

  const login = (response) => {
    try {
      localStorage.setItem('token', response.token);
      setUser(response.user);
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  }

  const logout = () => {
    setIsLogged(false);
    localStorage.removeItem('token');
  }

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
