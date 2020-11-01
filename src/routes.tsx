import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Register from './pages/Register'
import List from './pages/List'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Register} />
        <Route path="/list" component={List} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes