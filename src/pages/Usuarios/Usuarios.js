import { Box, Button, Divider, Grid2, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { SnackbarCenterContext } from '../../contexts/SnackbarCenterProvider'
import { AuthContext } from '../../contexts/AuthProvider';
import { Link as RouterLink } from 'react-router-dom';
import SmartTable from '../../components/SmartTable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TrashIcon from '@mui/icons-material/Delete';

export default function Usuarios() {
    const { notify } = useContext(SnackbarCenterContext);

    return (
        <Box sx={{ flexGrow: 1, width: '100%', }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                <Typography variant='h1' sx={{ pr: 2 }}>Usuários</Typography>
                <Link component={RouterLink} to='/administrativo/cadastrar-usuario'>
                    <Button variant='contained'>Cadastrar Usuário</Button>
                </Link>
            </Box>
            <Divider />

            <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 }}>
                <Grid2 container>
                    <Grid2 size={{ xs: 12, sm: 3 }}>
                        Card
                    </Grid2>

                    <Grid2 size={{ xs: 12, sm: 3 }}>
                        Card
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 3 }}>
                        Card
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 3 }}>
                        Card
                    </Grid2>
                </Grid2>
                <Typography variant='h5' sx={{ p: 1 }}>Meu conteúdo</Typography>

                <Box sx={{ maxWidth: '80vw', overflowX: 'auto' }}>
                    <SmartTable
                        bulkActions={
                            [
                                {
                                    label: 'Selecionar Ação em Massa',
                                    options: [
                                        {
                                            label: 'Adicionar Tags',
                                            icon: <FileDownloadIcon />,
                                            action: (selected) => notify(`Adicionando Tags em ${selected.length} usuários`, 'info')
                                        },
                                        {
                                            label: 'Remover Tags',
                                            icon: <FileDownloadIcon />,
                                            action: (selected) => notify(`Removendo Tags de ${selected.length} usuários`, 'info')
                                        },
                                    ]
                                },
                                {
                                    label: 'Exportar',
                                    tooltip: 'Exportar para Excel',
                                    icon: <FileDownloadIcon />,
                                    action: (selected) => notify(`Exportando dados de ${selected.length} usuários`, 'info')
                                },
                                {
                                    label: 'Deletar',
                                    tooltip: 'Deletar',
                                    color: 'error',
                                    icon: <TrashIcon />,
                                    noText: true,
                                    action: (selected) => notify(`Deletando ${selected.length} usuários`, 'info')
                                },
                            ]
                        }
                    />
                </Box>
            </Box>
            <Link component={RouterLink} to='/administrativo/editar-usuario/1'>
                <Button variant='contained'>Editar Usuário</Button>
            </Link>

        </Box >

    )
}
