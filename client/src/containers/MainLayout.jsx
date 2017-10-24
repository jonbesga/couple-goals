import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard.jsx'
import LoginPage from './LoginPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import WelcomePage from './WelcomePage.jsx'

import PrivateRoute from './PrivateRoute.jsx'

class MainLayout extends Component{
  
  render(){
    return(
      <Switch>
        <PrivateRoute exact path='/' component={Dashboard} notAuthorized={WelcomePage}/>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
      </Switch>
    )
  }
}

export default MainLayout