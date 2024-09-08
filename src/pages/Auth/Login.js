import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { Box, Button, FormControl, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider';


export default function Login() {
    const { login } = useContext(AuthContext);
    const { notify } = useContext(SnackbarCenterContext);
    const [formData, setFormData] = useState({
        email: '', password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = formData;
        if (email === '' || password === '') {
            notify('Preencha todos os campos', 'error');
            return;
        }
        try {
            // TODO: Fetch login from API to get JWT and set it in localStorage
            const dumyResponse = {
                token: "123456", user: {
                    name: "John Doe",
                    img: "https://avatars.githubusercontent.com/u/67137854?v=4",
                    title: "Agente Imobiliário",
                }
            };
            // Simulate a login
            login(dumyResponse);

            notify('Login efetuado com sucesso!', 'success');
        } catch (error) {
            console.error(error);
            notify('Erro ao efetuar login.', 'error');
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleLogin}>
                <FormControl sx={{ width: '300px' }}>
                    <Typography variant="h1" sx={{ mb: 1, textAlign: 'center' }}>Login</Typography>
                    <TextField label="Email" variant="outlined" sx={{ mb: 1 }} type='email' name='email' value={formData.email} onChange={handleChange} />
                    <TextField label="Password" variant="outlined" type="password" name='password' sx={{ mb: 1 }} value={formData.password} onChange={handleChange} />

                    <Button variant="contained" type='submit'>Login</Button>
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}><Link to="/esqueci-senha">Esqueci minha senha</Link></Typography>
                </FormControl>
            </form>
        </Box >
    )
}
