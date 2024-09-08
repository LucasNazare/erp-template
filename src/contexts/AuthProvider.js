import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

// Controla o estado de autenticação do usuário
export default function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  )
}
