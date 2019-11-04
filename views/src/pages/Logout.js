import React from 'react';
import { Redirect } from 'react-router-dom';


import APIClient from '../services/APIClient';
import { Authenticator } from '../services/Auth';


class Logout extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    localStorage.removeItem('2ooBearToken');
    return (
      <>
        <Redirect to={'/'}/>
      </>
    );
  }
}

export default Logout;
