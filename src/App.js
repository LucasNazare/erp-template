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
                      <Route key={index} path={route.path} element={
                        <DefaultTemplate showBreadcrumbs={true}>
                          {route?.loggedIn ?
                            <LoggedIn>
                              {route.contentElement}
                            </LoggedIn>
                            : route.contentElement
                          }
                        </DefaultTemplate>
                      } />
                      {route?.categories?.map((category, index) => {
                        return (
                          <>
                            {category?.subItems?.map((subItem, index) => {
                              return (
                                <Route key={index} path={subItem.path} element={
                                  <DefaultTemplate showBreadcrumbs={true}>
                                    {route?.loggedIn ?
                                      <LoggedIn>
                                        {subItem.contentElement}
                                      </LoggedIn>
                                      : subItem.contentElement
                                    }
                                  </DefaultTemplate>
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
    </ThemeProvider>
  );
}

export default App;
