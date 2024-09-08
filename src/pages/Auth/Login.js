import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'

export default function Login() {
    const { isLogged, setIsLogged } = useContext(AuthContext)
    return (
        <div>
            Usuario está logado? {isLogged ? 'Sim' : 'Não'}
            <br />
            <button onClick={() => setIsLogged(!isLogged)}>Logar/Deslogar</button>
        </div>
    )
}
