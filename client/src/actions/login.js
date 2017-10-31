import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function loginRequested(email, password){
  return {
    type: LOGIN_REQUEST,
    email,
    password
  }
}

function loginSucceed(data) {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    user: data.user,
  }
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILURE,
    summary: error.summary,
    email: error.email,
    password: error.password,
  }
}

export function loginUser(email, password) {
  return dispatch => {
    dispatch(loginRequested(email, password))

    return axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    })
    .then((response) => {
      if(response.data.success){
        dispatch(loginSucceed(response.data))
        localStorage.setItem('token', response.data.token)
      }
    })
    .catch((error) => {
      if(error.response.status === 401){
        dispatch(loginFailed(error.response.data.errors))
      }
    })
  }
}