import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import Login from '../pages/Auth/Login';

export default function LoggedIn({ children }) {
    const { isLogged } = useContext(AuthContext);


    if (!isLogged) return <Login />
    return children;
}
