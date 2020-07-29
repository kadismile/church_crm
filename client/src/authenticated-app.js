/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage,} from './components/lib'
import {Home} from './pages/home'
import {NotFoud} from './components/404'

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
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
       <Nav/>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
       <AppRoutes/>
      </ErrorBoundary>
    </ErrorBoundary>
  )
}


function Nav(params) {
  return (
      <ul>
        <li> Home</li>
        <li> About </li>
        <li> Contact </li>
      </ul>
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
