import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/login'

export default function login(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  errors: {
    summary: '',
    email: '',
    password: '',
  },
}, action){
  switch(action.type){
    
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        email: action.email,
        password: action.password
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        user: action.user,
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errors: {
          summary: action.summary,
          email: action.email,
          password: action.password,
        }
      });

    default:
      return state;
  }
}