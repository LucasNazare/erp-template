import Usuarios from "./pages/Usuarios/Usuarios";
import UsersIcon from '@mui/icons-material/People';
import WalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import Perfil from "./pages/Perfil/Perfil";

export const routes =
    [
        {
            label: 'CRM',
            path: '/crm',
            // contentElement: <Usuarios />,
            loggedIn: true,
            showOnMenu: false,
            showOnTopbar: true,
            categories: [{
                label: 'Dashboard',
                name: 'dashboard',
                iconElement: null,
                subItems: [
                    {
                        name: 'subItem1',
                        label: 'Sub Item 1',
                        path: '/crm/subItem1',
                        contentElement: <Usuarios />,
                    },
                    {
                        name: 'subItem2',
                        label: 'Sub Item 2',
                        path: '/crm/subItem2',
                        contentElement: <Usuarios />,
                    },
                    {
                        name: 'lindinha',
                        label: 'Lindinha',
                        path: '/crm/lindinha',
                        contentElement: <Usuarios />,
                    }
                ]
            },
            {
                label: 'Linducha',
                name: 'linducha',
                iconElement: <WalletIcon />,
                subItems: [
                    {
                        name: 'subItem1',
                        label: 'Sub Item 1',
                        path: '/crm/linducha',
                        contentElement: <Usuarios />,
                    },
                ],
            },
            ],
        },
        {
            label: 'Vendas',
            path: '/vendas',
            contentElement: <Usuarios />,
            loggedIn: true,
            showOnMenu: false,
            showOnTopbar: true,
            categories: [{
                label: 'Users',
                name: 'users',
                iconElement: <UsersIcon />,
                subItems: [
                    {
                        name: 'propostas',
                        label: 'Propostas',
                        path: '/vendas/propostas',
                        contentElement: <Usuarios />,
                    },
                ],
            }]
        },
        {
            label: 'Financeiro',
            path: '/financeiro',
            contentElement: <Usuarios />,
            loggedIn: true,
            showOnMenu: false,
            showOnTopbar: true,
            categories: [{
                label: 'Despesas',
                name: 'despesas',
                iconElement: <WalletIcon />,
                subItems: [
                    {
                        name: 'subItem1',
                        label: 'Sub Item 1',
                        path: '/financeiro/subItem1',
                        contentElement: <Usuarios />,
                    },
                ],
            }]
        },
        {
            label: 'Perfil',
            iconElement: <ProfileIcon />,
            path: '/perfil',
            // contentElement: <Usuarios />,
            loggedIn: true,
            showOnMenu: true,
            showOnTopbar: false,
            categories: [{
                label: 'Meu Perfil',
                name: 'meu-perfil',
                iconElement: <ProfileIcon />,
                subItems: [
                    {
                        name: 'subItem1',
                        label: 'Sub Item 1',
                        path: '/perfil/meu-perfil',
                        contentElement: <Perfil />,
                    },
                ],
            }]
        },
        {
            label: 'Configurações',
            iconElement: <SettingsIcon />,
            path: '/configuracoes',
            contentElement: <Usuarios />,
            loggedIn: true,
            hide: false,
            showOnMenu: true,
            showOnTopbar: false,
        }
    ]
