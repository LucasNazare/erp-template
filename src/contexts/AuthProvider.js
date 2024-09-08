import React, { createContext, useContext, useEffect, useState } from 'react'
import { SnackbarCenterContext } from './SnackbarCenterProvider';

export const AuthContext = createContext()

// Controla o estado de autenticação do usuário
export default function AuthProvider({ children }) {
  const { notify } = useContext(SnackbarCenterContext);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // TODO: Validate token with API
        const dumyResponse = {
          token: "123456", user: {
            name: "John Doe",
            img: "https://avatars.githubusercontent.com/u/67137854?v=4",
            title: "Agente Imobiliário",
          }
        };
        setUser(dumyResponse.user);
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
    notify('Desconectado com sucesso!', 'success');
  }

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, login, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}
