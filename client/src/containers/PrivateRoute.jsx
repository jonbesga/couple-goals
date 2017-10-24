import React, {Component} from 'react';

class PrivateRoute extends Component {
  constructor(props){
    super(props)

    this.requireAuth = this.requireAuth.bind(this);
  }

  requireAuth(nextState, replace, next) {
    // TODO
    // I can see problems here. Changing the local storage go bypass the access
    if(localStorage.getItem('token')){
      return true
    }
    else{
      return false
    }
  }

  render(){
    const ChildrenComponent = this.props.component
    const NotAuthorized = this.props.notAuthorized
    if(this.requireAuth()){
      return <ChildrenComponent/> 
    }
    else{
      return <NotAuthorized/>
    }
  }
}
export default PrivateRoute