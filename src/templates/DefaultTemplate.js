import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import useMediaQuery from '@mui/material/useMediaQuery';
import Topbar from '../components/Topbar';
import { useLocation } from 'react-router-dom';
import UsersIcon from '@mui/icons-material/PeopleAlt';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';

const navlinks = [
    {
        label: 'Leads',
        path: '/',
        categories: [{
            label: 'Dashboard',
            name: 'dashboard',
            iconElement: null,
            subItems: [
                {
                    name: 'subItem1',
                    label: 'Sub Item 1',
                    path: '/dashboard/subItem1',
                },
                {
                    name: 'subItem2',
                    label: 'Sub Item 2',
                    path: '/dashboard/subItem2',
                },
            ]
        }],
    },
    {
        label: 'Vendas',
        path: '/vendas',
        categories: [{
            label: 'Users',
            name: 'users',
            iconElement: <UsersIcon />,
            subItems: [
                {
                    name: 'subItem1',
                    label: 'Sub Item 1',
                    path: '/users/subItem1',
                },
            ],
        }]
    },
    {
        label: 'Financeiro',
        path: '/financeiro',
        categories: [{
            label: 'Despesas',
            name: 'despesas',
            iconElement: <WalletIcon />,
            subItems: [
                {
                    name: 'subItem1',
                    label: 'Sub Item 1',
                },
            ],
        }]
    },
];
const menulinks = [
    {
        label: 'Perfil',
        iconElement: <ProfileIcon />,
        path: '/perfil',
    },
    {
        label: 'Configurações',
        iconElement: <SettingsIcon />,
        path: '/configuracoes',
    }
];
export default function DefaultTemplate({ children }) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname?.split('/')[1]);
    const [categorySelected, setCategorySelected] = useState(null);

    useEffect(() => {
        setActivePath(`/${location.pathname?.split('/')[1]}`);
        setCategorySelected(null);
    }, [location]);



    const findCategoriesFromPath = () => {
        return navlinks?.find(navlink => navlink.path === activePath)?.categories;
    }


    return (
        <Box sx={{ display: 'flex' }}>


            <Sidebar
                categories={findCategoriesFromPath()}
                smallScreen={isSmallScreen}
                open={isDrawerOpen}
                setOpen={setIsDrawerOpen}
                categorySelected={categorySelected}
                setCategorySelected={setCategorySelected}
            />


            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Topbar
                    navlinks={navlinks}
                    menulinks={menulinks}
                    setIsDrawerOpen={setIsDrawerOpen}
                    activePath={activePath}
                />

                <Box sx={{ m: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
