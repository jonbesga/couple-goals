import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import TextField from 'material-ui/TextField';

import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

class RegisterForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      registerSucess: false,
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.submitForm = this.submitForm.bind(this);
    this.changeValues = this.changeValues.bind(this);
  }

  changeValues(event) {
    const name = event.target.name
    const value =event.target.value
    this.setState((prevState, props) => {
      const user = prevState.user
      user[name] = value
      return user
    });
  }

  submitForm(event) {
    event.preventDefault();

    const self = this;
    axios.post('http://localhost:3000/auth/register', {
      name: this.state.user.name,
      email: this.state.user.email,
      password: this.state.user.password
    })
    .then(function (response) {
      if(response.status ===  200){
        self.setState({
          errors: response.data.errors,
          registerSucess: response.data.success
        })
      }
    })
    .catch(function (error) {
      self.setState({
          errors: error.response.data.errors,
          registerSucess: error.response.data.success
        })
    });  
  }

  render(){
    if (this.state.registerSucess) {
       return <Redirect to='/login'/>;
    }
    return( 
      <div>
        <Card className="container">
          <h2 className="card-heading">Sign Up</h2>

          <form action="/" onSubmit={this.submitForm}>
            <TextField
              floatingLabelText="Name"
              name="name"
              type="text"
              onChange={this.changeValues}
              errorText={this.state.errors.name}
            />
            <TextField
              floatingLabelText="Email"
              name="email"
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
            
            <RaisedButton type="submit" label="Create New Account" primary />  
            
          </form>
          <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
        </Card>
      </div>
    )
  }
}

export default RegisterForm;