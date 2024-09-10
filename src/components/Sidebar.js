import { Link as RouterLink } from 'react-router-dom';
import { Box, Collapse, Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Skeleton, SwipeableDrawer } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../assets/imgs/KW_VALE.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react'


const drawerWidth = 240;


export default function Sidebar({ categories = [], categorySelected, setCategorySelected, open, setOpen }) {
    const [mainImg, setMainImg] = useState(null);

    useEffect(() => {
        //TODO: Fetch main image
        setMainImg(logo);
    }, []);


    const selectCategory = (e) => {
        const category = e.currentTarget.getAttribute('name');

        if (category === categorySelected)
            setCategorySelected(null);
        else
            setCategorySelected(category);
    }

    const categoryListItem = (category, index) => {
        return (
            <Box key={index}>
                <ListItem button style={{ cursor: 'pointer' }} name={category.name} onClick={selectCategory}>
                    <ListItemIcon sx={{ userSelect: 'none' }}>

                        {
                            category.iconElement ?
                                React.cloneElement(category.iconElement, { color: categorySelected === category.name ? 'primary' : 'secondary' })
                                :
                                <DashboardIcon color={categorySelected === category.name ? 'primary' : 'secondary'} />
                        }
                    </ListItemIcon>
                    <ListItemText primary={category.label} sx={{ userSelect: 'none' }} />
                    <KeyboardArrowDownIcon sx={[{
                        transition: '0.2s',
                    },
                    {
                        transform: categorySelected === category.name ? 'rotate(180deg)' : 'rotate(0deg)',
                    }]} />
                </ListItem>

                <Collapse in={categorySelected === category.name} unmountOnExit>
                    {category?.subItems?.map((subItem) => {
                        return (
                            !subItem.hide &&
                            <Link component={RouterLink} to={subItem.path} key={subItem.name} color='secondary'>
                                <ListItem button sx={{ pt: 0, pb: 0 }} style={{ cursor: 'pointer' }}>
                                    <ListItemText primary={subItem?.label} sx={{ ml: 3, fontSize: '0.4rem', userSelect: 'none' }} />
                                </ListItem>
                            </Link>
                        )
                    })}
                </Collapse>
            </Box>
        )
    }



    const sidebarContent = () => {
        return (
            <List>
                <ListItem>
                    {mainImg ?
                        <img src={mainImg} alt="Logo" style={{ width: '100%' }} />
                        :
                        <Skeleton variant="rectangular" width={drawerWidth} height={drawerWidth / 2} />
                    }
                </ListItem>

                <Divider sx={{ m: 3 }} />

                {categories?.map((category, index) => {
                    return (
                        categoryListItem(category, index)
                    )
                })}
            </List>
        )
    }

    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    return (
        <>
            {/* Wide screen */}
            <Drawer
                variant={'permanent'}
                open={open}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {sidebarContent()}
            </Drawer>

            {/* Vertical screen */}
            <SwipeableDrawer
                anchor={'left'}
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {sidebarContent()}
            </SwipeableDrawer>
        </>
    )
}
