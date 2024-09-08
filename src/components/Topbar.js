import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Avatar, Box, Container, Divider, IconButton, Link, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthProvider';

export default function Topbar({ navlinks, menulinks, activePath }) {
    const { user, logout } = useContext(AuthContext);
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const menuOpen = Boolean(menuAnchorEl);

    const handleOpenMenu = (e) => {
        setMenuAnchorEl(e.currentTarget);
    }
    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    }

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


                    <Box sx={{ flexGrow: 1, userSelect: 'none' }}>
                        {navlinks?.map((navlink, index) => {
                            return (
                                <Link key={index} component={RouterLink} to={navlink.path}>
                                    <Typography variant="appbarButton" sx={{ mr: 2, fontWeight: activePath === navlink.path ? 900 : 500 }}>
                                        {navlink.label}
                                    </Typography>
                                </Link>
                            )
                        })}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ m: 0 }}
                        >
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{ m: 0 }}
                            onClick={handleOpenMenu}
                        >
                            <Avatar
                                sx={{ width: 32, height: 32 }}
                                src={user?.img}
                            />
                        </IconButton>
                        <Menu
                            open={menuOpen}
                            anchorEl={menuAnchorEl}
                            onClose={handleCloseMenu}
                            sx={{
                                pl: 20,
                            }}
                        >
                            <Box sx={{ pl: 10, pr: 10, pt: 1, textAlign: 'center' }}>
                                <Avatar
                                    sx={{ width: 64, height: 64, textAlign: 'center', margin: 'auto' }}
                                    src={user?.img}
                                />
                                <Typography variant="h5" sx={{ pt: 1 }}>
                                    {user?.name}
                                </Typography>
                                <Typography variant="h6" sx={{ pb: 1 }} color='primary'>
                                    {user?.title}
                                </Typography>
                            </Box>

                            <Divider />

                            <Box>
                                <MenuList>
                                    {menulinks?.map((navlink, index) => {
                                        return (
                                            <Link component={RouterLink} to={navlink.path} color='secondary'>
                                                <MenuItem key={index}>

                                                    <ListItemIcon>
                                                        {navlink.iconElement ? navlink.iconElement : <SettingsIcon />}
                                                    </ListItemIcon>
                                                    <ListItemText primary={navlink.label} />

                                                </MenuItem>
                                            </Link>
                                        )
                                    })}
                                </MenuList>

                                <Divider />

                                <MenuList>
                                    <MenuItem onClick={logout}>
                                        <ListItemIcon >
                                            <LogoutIcon color='primary' />
                                        </ListItemIcon>
                                        <ListItemText primary="Sair" color='primary' />
                                    </MenuItem>
                                </MenuList>
                            </Box>
                        </Menu>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )
}
