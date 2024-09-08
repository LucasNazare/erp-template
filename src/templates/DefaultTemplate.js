import { Box } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import useMediaQuery from '@mui/material/useMediaQuery';
import Topbar from '../components/Topbar';

export default function DefaultTemplate({ children }) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>


            <Sidebar smallScreen={isSmallScreen} open={isDrawerOpen} setOpen={setIsDrawerOpen} />


            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <Topbar setIsDrawerOpen={setIsDrawerOpen} />

                <Box sx={{ m: 3 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    )
}
