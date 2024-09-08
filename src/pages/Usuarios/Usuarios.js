import { Box, Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider'
import { AuthContext } from '../../contexts/AuthProvider';

export default function Usuarios() {
    const { notify } = useContext(SnackbarCenterContext);
    const { logout } = useContext(AuthContext);

    const exampleNotifications = [{
        title: 'Um erro 1',
        message: 'My message 1',
        type: 'info',
    },
    {
        title: 'Um erro 2',
        message: 'My message 2',
        type: 'error',
    },
    {
        title: 'Um erro 3',
        message: 'My message 3',
        type: 'success',
    },
    {
        title: 'Um erro 4',
        message: 'My message 4',
        type: 'info',
    }
    ]

    return (
        <Box sx={{ display: 'flex', }}>
            <Typography variant='h1'>Usuários</Typography>
            <Button variant='contained' color='primary' onClick={() => notify(exampleNotifications[Math.floor(Math.random() * exampleNotifications.length)])}>Notificar</Button>
            <Button variant='outlined' color='primary'>Listar</Button>


            <Typography variant='h2'>Usuários</Typography>
            <Button variant='contained' color='secondary'>Cadastrar</Button>
            <Button variant='outlined' color='secondary' onClick={logout}>Sair</Button>
        </Box>

    )
}
