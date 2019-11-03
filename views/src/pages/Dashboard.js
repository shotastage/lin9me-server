import React from 'react';
import styled from 'styled-components';
import { GridContainer, Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import { CardCell } from '../components/CardCell';
import { AuthRequired } from '../services/Auth';
import { withTranslation } from 'react-i18next';


const LinkCard = styled(CardCell)`
  min-width: 0;
`;


class Dashboard extends React.Component {

  render() {
    const { t } = this.props;

    return (
      <AuthRequired>
        <Navigation>
          <NavBrand>Dashboard</NavBrand>
        </Navigation>
        <Container>
          <Row>
            <h1>Links</h1>
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
      </AuthRequired>
    );
  }
}


export default withTranslation()(Dashboard);
