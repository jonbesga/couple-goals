import axios from 'axios';

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function registerRequested(name, email, password){
  return {
    type: LOGIN_REQUEST,
    name,
    email,
    password
  }
}

function registerSucceed(user) {
  return {
    type: REGISTE_SUCCESS,
    user,
  }
}

function registerFailed(message) {
  return {
    type: REGISTER_FAILURE,
    message,
  }
}

export function registerUser(name, email, password) {
  return dispatch => {
    dispatch(registerRequested(name, email, password))

    return axios.post('http://localhost:3000/auth/register', {
      name,
      email,
      password,
    })
    .then((response) => {
      console.log(response.data)
      if(response.data.success){
        dispatch(loginRegister(response.data.user))
      }
    })
    .catch((error) => {
      if(error.response.status === 401){
        dispatch(registerFailed(error.response.data.errors.password))
      }
    })
  }
}