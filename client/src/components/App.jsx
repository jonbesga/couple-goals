import React, {Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginPage from './LoginPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import InitialPage from './InitialPage.jsx'
import NavbarLayout from '../containers/NavbarLayout.jsx'

class App extends Component{
  render(){
    return(
      <MuiThemeProvider>
        <div>
          <NavbarLayout/>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={InitialPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path='/register' component={RegisterPage}/> 
            </Switch>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App