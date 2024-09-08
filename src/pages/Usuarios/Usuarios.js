import { Box, Button, Typography } from '@mui/material'
import React from 'react'
export default function Usuarios() {
    return (
        <Box sx={{ display: 'flex', }}>
            <Typography variant='h1'>Usuários</Typography>
            <Button variant='contained' color='primary'>Cadastrar</Button>
            <Button variant='outlined' color='primary'>Listar</Button>


            <Typography variant='h2'>Usuários</Typography>
            <Button variant='contained' color='secondary'>Cadastrar</Button>
            <Button variant='outlined' color='secondary'>Listar</Button>
        </Box>

    )
}
