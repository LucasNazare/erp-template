import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Box, Container, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

export default function Topbar() {
    const location = useLocation();
    const { user } = useContext(AuthContext);
    const [activePath, setActivePath] = useState(location.pathname?.split('/')[1]);

    useEffect(() => {
        setActivePath(location.pathname?.split('/')[1]);
    }, [location]);

    return (
        <AppBar position="static" color='secondary'>
            <Container>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Box sx={{ flexGrow: 1 }}>

                        <Link component={RouterLink} to="/  ">
                            <Typography variant="appbarButton" sx={{ mr: 2, fontWeight: activePath === '' ? 700 : 500 }}>
                                Leads
                            </Typography>
                        </Link>

                        <Link component={RouterLink} to="/financeiro">
                            <Typography variant="appbarButton" sx={{ mr: 2, fontWeight: activePath === 'financeiro' ? 900 : 500 }}>
                                Financeiro
                            </Typography>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ m: 0 }}
                        >
                            <Typography variant="appbarButton" sx={{ mr: 2 }}>
                                {user?.name}
                            </Typography>
                            <Avatar
                                sx={{ width: 32, height: 32 }}
                                src={user?.img}
                            />
                        </IconButton>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
