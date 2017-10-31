import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE
} from '../actions/register'

export default function register(state = {
  isFetching: false,
  isRegistered: false
}, action){
  switch(action.type){
    
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        name: action.name,
        email: action.email,
        password: action.password
      });

    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: true,
        user: action.user,
      });

    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isRegistered: false,
        message: action.message
      });

    default:
      return state;
  }
}

