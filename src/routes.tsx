import React from 'react'
import { BrowserRouter, Route, Switch, Redirect, RouteProps } from 'react-router-dom'

import BlankRoute from './layouts/blank/route'
import MainPrivateRoute from './layouts/main/route'

import Login from './pages/Login'
import Register from './pages/Register'
import List from './pages/List'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <BlankRoute exact path="/" component={Login} />
        <MainPrivateRoute exact path="/prematricula" component={Register} />
        <MainPrivateRoute exact path="/lista" component={List} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes