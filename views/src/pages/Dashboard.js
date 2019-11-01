import React from 'react';
import styled from 'styled-components';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';


import { withTranslation } from 'react-i18next';



class Dashboard extends React.Component {

  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>Dashboard</NavBrand>
        </Navigation>
        <Container>
          <Row>
            <h1>Functions</h1>
          </Row>
          <MarginSparcer/>
        </Container>
      </>
    );
  }
}


export default withTranslation()(Dashboard);
