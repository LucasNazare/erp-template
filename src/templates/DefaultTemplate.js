import { Box } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import useMediaQuery from '@mui/material/useMediaQuery';

export default function DefaultTemplate({ children }) {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* //TODO: Add toolbar

            //TODO: Add sidebar */}
            <Sidebar smallScreen={isSmallScreen} open={isDrawerOpen} setOpen={setIsDrawerOpen} />

            <Box sx={{ m: 3 }}>
                <button onClick={() => setIsDrawerOpen(!isDrawerOpen)}>Toggle Drawer</button>
                {children}
            </Box>
        </Box>
    )
}
