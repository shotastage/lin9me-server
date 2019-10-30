import React from 'react';
import styled from 'styled-components';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import '../App.scss';

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
        <Container>
          <Row>
            <p>License doc has been under construction.</p>
          </Row>
        </Container>
      </>
    );
  }
}


export default withTranslation()(LicenseDoc);
