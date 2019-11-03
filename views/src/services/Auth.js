import React, { useState } from "react"
import { createContainer } from "unstated-next"
import { render } from "react-dom"
import { Redirect } from 'react-router-dom'


function useAuthenticator(initialState = 0) {
  let [count, setCount] = useState(initialState)
  
  let login = () => {
    setCount(count - 1)
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

export class AuthContainer extends React.Component {

  state = {
    authToken: "none",
    isLoggedIn: false
  }

  login() {
    if (this.state.authToken !== "none")
      this.setState({
        authToken: this.state.authToken,
        isLoggedIn: true
      });
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
  