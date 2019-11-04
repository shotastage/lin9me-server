import React, { useState } from "react";
import { createContainer } from "unstated-next";
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Route } from "react-router-dom";


function useAuthenticator(initialState = { authToken: "none", isLoggedIn: false }) {
  
  let [auth, setAuthorization] = useState(initialState)
  
  let login = () => {
    if (this.state.authToken !== "none")
      localStorage.setItem("2ooBearToken", auth.authToken)
      setAuthorization({
        authToken: localStorage.getItem("2ooBearToken"),
        isLoggedIn: true
      });
  }
  
  let logout = () => {
    setAuthorization({
      authToken: "none", isLoggedIn: false
    })
  }

  return { auth, login, logout }
}

export const Authenticator = createContainer(useAuthenticator)



export class AuthRequired extends React.Component {

  constructor(props) {
    super(props)

    if (localStorage.getItem("2ooBearToken") !== null) {
      this.state = {
        AuthBearToken: localStorage.getItem("2ooBearToken")
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
