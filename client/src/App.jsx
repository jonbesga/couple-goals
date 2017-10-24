import React, {Component} from 'react';
import { BrowserRouter } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderLayout from './containers/HeaderLayout.jsx';
import MainLayout from './containers/MainLayout.jsx';

import './App.css';

export default class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <HeaderLayout/>
            <MainLayout/>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    )
  }
}