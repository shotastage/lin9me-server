import React from 'react';
import styled from 'styled-components';
import { Navigation, NavBrand } from '../components/Navigation';
import { Button } from '../components/Buttons';
import { withTranslation } from 'react-i18next';
import { MarginSparcer, Container, Row } from '../components/Grid';
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
