import React from 'react';
import styled from 'styled-components';
import { GridContainer, Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import { CardCell } from '../components/CardCell';

import { withTranslation } from 'react-i18next';


const LinkCard = styled(CardCell)`
  min-width: 360px;
`;


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
            <h1>Share Links</h1>
          </Row>
        </Container>
        <GridContainer>      
            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>

            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>

            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>
        
          
            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>

            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>

            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>
          

          
            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>

            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>

            <LinkCard>
              <h1>lin9.me/E45t</h1>
            </LinkCard>
        
          <MarginSparcer/>
        </GridContainer>
      </>
    );
  }
}


export default withTranslation()(Dashboard);
