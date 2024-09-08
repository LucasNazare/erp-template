import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import theme from './theme';
import Usuarios from './pages/Usuarios/Usuarios';
import LoggedIn from './templates/LoggedIn';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import AuthProvider from './contexts/AuthProvider';
import SnackbarCenterProvider from './contexts/SnackbarCenterProvider';
import DefaultTemplate from './templates/DefaultTemplate';




function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarCenterProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" exact element={
                <LoggedIn>
                  <DefaultTemplate>
                    <Usuarios />
                  </DefaultTemplate>
                </LoggedIn>
              } />


              <Route path="/financeiro" exact element={
                <LoggedIn>
                  <DefaultTemplate>
                    <Usuarios />
                  </DefaultTemplate>
                </LoggedIn>
              } />

            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarCenterProvider>
    </ThemeProvider>
  );
}

export default App;
