import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Usuarios from './pages/Usuarios/Usuarios';
import Login from './pages/Auth/Login';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import AuthProvider from './contexts/AuthProvider';
import SnackbarCenterProvider from './contexts/SnackbarCenterProvider';




function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarCenterProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" exact element={
                <Usuarios />
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarCenterProvider>
    </ThemeProvider>
  );
}

export default App;
