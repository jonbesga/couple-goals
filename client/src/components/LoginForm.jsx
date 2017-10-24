import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import TextField from 'material-ui/TextField';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class LoginForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      loginSucess: false,
      errors: {},
      user: {
        email: '',
        password: ''
      }
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeValues = this.changeValues.bind(this);
  }

  changeValues(event) {
    const field = event.target.name
    const value = event.target.value

    this.setState((prevState, props) => {
      const user = prevState.user
      user[field] = value
      return user
    });
  }

  submitForm(event) {
    event.preventDefault();
    const self = this;

    axios.post('/auth/login', {
      email: this.state.user.email,
      password: this.state.user.password
    })
    .then(function (response) {
      if(response.status ===  200){
        if(response.data.success){
          localStorage.setItem('token', response.data.token);
        }

        self.setState({
          errors: response.data.errors,
          loginSucess: response.data.success
        })
      }
    })
    .catch(function (error) {
      self.setState({
        errors: error.response.data.errors,
        loginSucess: error.response.data.success
      })
    });  
  }

  render(){
    if (this.state.loginSucess) {
       return <Redirect to='/'/>;
    }
    return( 
      <div>
        <Card className="container">
          <h1>Login</h1>

          <form action="/" onSubmit={this.submitForm}>
            <TextField
              floatingLabelText="Email"
              name="email"
              type="email"
              onChange={this.changeValues}
              errorText={this.state.errors.email}
            />
            <TextField
              floatingLabelText="Password"
              name="password"
              type="password"
              onChange={this.changeValues}
              errorText={this.state.errors.password}
            />
            <div className='button'>
              <RaisedButton type="submit" label="Login" primary />  
            </div>

          </form>
          <CardText>Dont have an account? <Link to={'/register'}>Sign Up</Link></CardText>
        </Card>
      </div>
    )
  }
}

export default LoginForm;