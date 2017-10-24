import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class HeaderLayout extends Component{
  constructor(props){
    super(props)

    this.state = {
      logoutDone: false,
      open: false
    }

    this.handleToggle = this.handleToggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleToggle(){
    this.setState({open: !this.state.open});
  } 

  logout(){
    localStorage.removeItem('token')
    this.setState({logoutDone: true})
  }

  render(){
    if(this.state.logoutDone){
      // TODO 
      window.location.reload();
    }
    return(
      <div>
        <AppBar
          title="Couple Goals"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconButton>
              <FontIcon className="material-icons">search</FontIcon>
            </IconButton>
          }
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Drawer>
      </div>
    )
  }
}

export default HeaderLayout