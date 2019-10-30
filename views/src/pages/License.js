import React from 'react';
import styled from 'styled-components';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import '../App.scss';

import Plus from '../assets/icons/plus.svg';
import Compass from '../assets/icons/compass.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';

import { withTranslation } from 'react-i18next';



class LicenseDoc extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>License</NavBrand>
        </Navigation>
        <MarginSparcer/>
        <p>License doc has been under construction.</p>
      </>
    );
  }
}


export default withTranslation()(LicenseDoc);
