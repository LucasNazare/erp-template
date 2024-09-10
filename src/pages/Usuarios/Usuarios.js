import { Box, Button, Divider, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider'
import { AuthContext } from '../../contexts/AuthProvider';
import { Link as RouterLink } from 'react-router-dom';

export default function Usuarios() {
    const { notify } = useContext(SnackbarCenterContext);

    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant='h1'>Usuários</Typography>
                <Link component={RouterLink} to='/administrativo/cadastrar-usuario'>
                    <Button variant='contained'>Cadastrar Usuário</Button>
                </Link>
            </Box>
            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant='body1'>Meu conteúdo</Typography>
            </Box>

        </Box >

    )
}
