import React, { Component } from 'react';
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';

class InitialPage extends Component {
  render() {
    const { dispatch, isAuthenticated } = this.props
    if(isAuthenticated){
      return <Dashboard />
    }
    return (
      <div>
        <h1 className='title'>Welcome to Couple Goals</h1>
        <div className='button'>
          <RaisedButton
            containerElement={<Link to="/register" />}
            label="Register"
            primary
          />
        </div>
        <div className='button'>
          <RaisedButton
            containerElement={<Link to="/login" />}
            label="Login"
            secondary
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { login, register } = state
  const { isAuthenticated, errorMessage } = login

  return{
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(InitialPage)