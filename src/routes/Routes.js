import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../components/auth/Login'
import NewAccount from '../components/auth/NewAccount'
import Projects from '../components/projects/Projects'
import PrivateRoute from './PrivateRoute'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/new-account" component={NewAccount} />
        <PrivateRoute exact path="/projects" component={Projects} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
