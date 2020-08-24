/** @jsx jsx */
/** @jsxFrag React.Fragment */
//import React, {useEffect} from 'react'
import {jsx} from '@emotion/core'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage,} from './components/lib'
import {Home} from './pages/home'
import {NotFoud} from './components/404'
import {Header} from "./components/header";
import {SideBar} from "./components/sidebar";

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp() {
  return (
      // eslint-disable-next-line no-undef
    <div>
       <Header/>
      <SideBar/>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
       <AppRoutes/>
      </ErrorBoundary>
    </div>
  )
}

function AppRoutes() {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFoud />} />
      </Switch>
    </Router>
  )
}

export default AuthenticatedApp
