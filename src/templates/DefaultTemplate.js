import { Box, Breadcrumbs, Link } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import useMediaQuery from '@mui/material/useMediaQuery';
import Topbar from '../components/Topbar';
import { BrowserRouter as Router, Route, Link as RouterLink, Routes, useLocation } from 'react-router-dom';
import { routes } from '../routes';

export default function DefaultTemplate({ showBreadcrumbs, children }) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname?.split('/')[1]);
    const [activePage, setActivePage] = useState('');
    const [categorySelected, setCategorySelected] = useState(null);

    useEffect(() => {
        setActivePath(`/${location.pathname?.split('/')[1]}`);
        if (location.pathname?.split('/').length > 2)
            setActivePage(location.pathname?.split('/')[2]);
        setCategorySelected(null);
    }, [location]);



    const findCategoriesFromPath = () => {
        return routes?.find(navlink => navlink.path === activePath)?.categories;
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


            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    alignItems: {
                        xs: 'center',    // Center for small screens
                        md: 'flex-start' // Align left for medium and larger screens
                    },
                    justifyContent: {
                        xs: 'center',    // Center vertically for small screens (optional)
                        md: 'flex-start' // Default vertical alignment for medium and larger screens
                    }
                }}
            >
                <Topbar
                    navlinks={routes}
                    setIsDrawerOpen={setIsDrawerOpen}
                    activePath={activePath}
                />

                <Box sx={{ p: 3, width: { xs: 'auto', md: '100%' } }}>

                    {showBreadcrumbs && <Breadcrumbs separator="›" sx={{ mb: 2 }}>
                        <Link
                            component={RouterLink}
                            to={
                                routes.find(link => link.path === activePath)?.categories?.[0]?.subItems?.[0]?.path ||
                                routes.find(link => link.path === activePath)?.path || location.pathname
                            }
                        >
                            {routes.find(link => link.path === activePath)?.label}
                        </Link>

                        <Link
                            component={RouterLink}
                            to={
                                location.pathname.split('/').length > 2
                                    ? location.pathname.split('/').slice(0, 3).join('/')
                                    : location.pathname
                            }
                        >
                            {routes
                                .find(link => link.path === activePath)
                                ?.categories?.find(category => category.subItems?.find(subItem => subItem.path.includes(location.pathname)))
                                ?.subItems?.find(subItem => subItem.path.includes(location.pathname))?.label
                            }
                        </Link>



                    </Breadcrumbs>
                    }
                    {children}
                </Box>
            </Box>
        </Box >
    )
}
