import React, { useState } from "react"
import { createContainer } from "unstated-next"
import { render } from "react-dom"
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Route } from "react-router-dom";
import Login from '../pages/Login';

function useAuthenticator(initialState = 0) {
  
  const list = { authToken: "none", isLoggedIn: false }

  let [count, setCount] = useState(initialState)
  
  let login = () => {
    if (this.state.authToken !== "none")
      this.setState({
        authToken: this.state.authToken,
        isLoggedIn: true
      });
  }
  
  let logout = () => {
    setCount(count + 1)
  }

  return { count, login, logout }
}

let Authenticator = createContainer(useAuthenticator)



export class AuthRequired extends React.Component {

  constructor(props) {
    super(props)

    if (localStorage.getItem("2ooAuthBearToken") !== null) {
      this.state = {
        AuthBearToken: localStorage.getItem("2ooAuthBearToken")
      };
    } else {
      this.state = {
        AuthBearToken: "none"
      };
    }
  }


  render() {
    return (
      <Authenticator.Provider>      
          {
            (this.state.AuthBearToken !== "none") 
              ? this.props.children
              :  <Redirect to={'/m/signin'}/>
          }
      </Authenticator.Provider>
    )
  }
}


class AuthRedirect extends React.Component {
  render() {
    alert("AAAAA")

    return (
      <Redirect to={'/m/signin'}/>
    )
  }
}

export class AuthRequiredRoute extends AuthRequired {
  render() {
    return (
      <Authenticator.Provider>      
          {
            (this.state.AuthBearToken !== "none") 
              ?  <Route children={this.props.children} />

              :  <Route path={this.props.children} component={AuthRedirect}></Route>
          }
      </Authenticator.Provider>
    )
  }
}


export class AuthContainer extends React.Component {

  state = {
    authToken: "none",
    isLoggedIn: false
  }

  login() {
    
  }

  logout() {

    // Remove all persistent stores
    localStorage.clear();

    this.setState({
      authToken: "none",
      isLoggedIn: false
    });

    // Back to home
    window.location.replace('/');
  }
}
  