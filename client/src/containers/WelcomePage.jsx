import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

class WelcomePage extends Component{
  render(){
    return(
      <div className='container'>
        <h1>Welcome to Couple Goals again again</h1>
        <div className='row'>
          <RaisedButton
            containerElement={<Link to="/register" />}
            label="Register"
            primary
          />
        </div>
        <div className='row'>
          <RaisedButton
              containerElement={<Link to="/login" />}
              label="Login"
              secondary
          />
        </div>
      </div>
    )
  }
}

export default WelcomePage
