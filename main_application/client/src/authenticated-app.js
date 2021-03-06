/** @jsx jsx */
/** @jsxFrag React.Fragment */
//import React, {useEffect} from 'react'
import {jsx} from '@emotion/core'

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'
import {ErrorMessage,} from './components/lib'
import {Home} from './pages/home'
import {AddChurchMember} from './pages/add_church_member'
import {AddGroupModal} from './components/modals/add_group'
import {NotFoud} from './components/404'
import {Header} from "./components/header";
import {SideBar} from "./components/sidebar";
import React from "react";

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
   <div id="layout-wrapper">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>
          <Route render={props => <Header {...props} />} />
          <Route render={props => <SideBar {...props} />} />
          <Switch>
            <Route path="/" exact render={props => <Home {...props} />} />
            <Route path="/add-church-member" exact render={props => <AddChurchMember {...props} />} />
            <Route path="/add-group" exact render={props => <AddGroupModal {...props} />} />
            <Route path="*" exact render={props => <NotFoud {...props} />} />
          </Switch>
        </Router>
        
      </ErrorBoundary>
     <footer className="footer">
       <div className="container-fluid">
         <div className="row">
           <div className="col-sm-6">
           
           </div>
           <div className="col-sm-6">
             <div className="text-sm-right d-none d-sm-block">
               {new Date().getFullYear()} © kadismile.
             </div>
           </div>
         </div>
       </div>
     </footer>
    </div>
  )
}


export default AuthenticatedApp
