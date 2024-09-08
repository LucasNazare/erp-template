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

  const createRouteElement = (loggedIn, contentElement) => {
    return loggedIn ?
      <LoggedIn>
        <DefaultTemplate showBreadcrumbs={true}>
          {contentElement}
        </DefaultTemplate>
      </LoggedIn>
      : contentElement
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
                  if (route?.categories === undefined) {
                    return (
                      <Route key={route.path} path={route.path} element={
                        createRouteElement(route.loggedIn, route.contentElement)
                      } />
                    )
                  }
                  return (
                    <>
                      {route?.categories?.map((category, index) => {
                        return (
                          <>
                            {category?.subItems?.map((subItem, index) => {
                              return (
                                <Route key={subItem.path} path={subItem.path} element={
                                  createRouteElement(route.loggedIn, subItem.contentElement)
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
