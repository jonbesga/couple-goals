import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import TextField from 'material-ui/TextField';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Dashboard from './Dashboard.jsx';
import { loginUser } from '../actions/login'
class LoginPage extends Component{

  handleClick(event) {
    const email = this.refs.email
    const password = this.refs.password
    this.props.dispatch(this.props.loginUser(email.input.value.trim(), password.input.value.trim()))
  }

  render(){
    const { dispatch, errors, isAuthenticated } = this.props;
    const { summary, email, password } = errors
    if(isAuthenticated){
      return <Redirect to="/" />
    }
    return(
      <div>
        <h1>Login</h1>
        <form action="/">
          
          <TextField
            floatingLabelText="Email"
            ref="email"
            type="email"
            errorText={email}
          />
          <TextField
            floatingLabelText="Password"
            ref="password"
            type="password"
            errorText={password || summary}
          />
          <div>
            <RaisedButton type="button" label="Login" primary onClick={(e) => this.handleClick(e)} />
          </div>

        </form>
        <div>
          <p>Dont have an account? <Link to={'/register'}>Sign Up</Link></p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { login } = state
  const { errors, isAuthenticated } = login

  return{
    loginUser,
    errors,
    isAuthenticated,
  }
}

export default connect(mapStateToProps)(LoginPage)