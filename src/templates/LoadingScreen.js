import { Backdrop, Box, CircularProgress, Typography } from '@mui/material';
import React from 'react';

export default function LoadingScreen() {
    return (
        <Backdrop
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                color: '#fff',
            }}
            open={true}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CircularProgress color="inherit" sx={{ m: 1 }} />
                <Typography
                    variant="h6"
                    sx={{
                        color: 'inherit',
                        mt: 2,
                        '&::after': {
                            content: '"..."',
                            animation: 'dots 1.5s steps(3, end) infinite',
                        },
                        '@keyframes dots': {
                            '0%': {
                                content: '"."',
                            },
                            '33%': {
                                content: '".."',
                            },
                            '66%': {
                                content: '"..."',
                            },
                            '100%': {
                                content: '""',
                            },
                        },
                    }}
                >
                    Carregando
                </Typography>
            </Box>
        </Backdrop>
    );
}
