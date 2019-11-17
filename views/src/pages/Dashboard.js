import React from 'react';
import styled from 'styled-components';
import { GridContainer, Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import { CardCell } from '../components/CardCell';
import { withTranslation } from 'react-i18next';
import { AuthRequired } from '../services/Auth';
import { APIClient, AuthToken } from '../services/APIClient';

const LinkCard = styled(CardCell)`
  min-width: 0;
`;


class Dashboard extends React.Component {

  constructor(props) {
    super(props)

   
  }  

  render() {
    const { t } = this.props;
    APIClient.GET("/ggw/save/list", {}, (data) => {
      
    
      console.log(data.links)
      if (data.message !== null) {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        console.log(data.message)
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
        this.setState({
          links: [{"link": "No links"}]
        })
        
      }
      
    });
    return (
      <AuthRequired>
        <Navigation>
          <NavBrand>Dashboard</NavBrand>
        </Navigation>
        <Container>
          <Row>
            <h1>Saved Links</h1>
          </Row>
        </Container>
        <GridContainer>   
          { this.state.links.map((value) => <LinkCard><h1>{value.link}</h1></LinkCard>)}
          <MarginSparcer/>
        </GridContainer>
      </AuthRequired>
    );
  }
}


export default withTranslation()(Dashboard);
