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
import { routes } from './routes';




function App() {

  const createRouteElement = route => {
    return route?.loggedIn ?
      <LoggedIn>
        <DefaultTemplate showBreadcrumbs={true}>
          {route.contentElement}
        </DefaultTemplate>
      </LoggedIn>
      : route.contentElement
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarCenterProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {
                routes?.map((route, index) => {
                  return (
                    <>
                      <Route key={route.path} path={route.path} element={
                        createRouteElement(route)
                      } />
                      {route?.categories?.map((category, index) => {
                        return (
                          <>
                            {category?.subItems?.map((subItem, index) => {
                              return (
                                <Route key={subItem.path} path={subItem.path} element={
                                  createRouteElement(route)
                                } />
                              )
                            })}
                          </>
                        )
                      })}
                    </>
                  )
                })

              }

            </Routes>
          </Router>
        </AuthProvider>
      </SnackbarCenterProvider>
    </ThemeProvider >
  );
}

export default App;
