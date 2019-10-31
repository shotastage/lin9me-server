import React from 'react';
import styled from 'styled-components';
import { Navigation, NavBrand } from '../components/Navigation';
import { Button } from '../components/Buttons';
import { withTranslation } from 'react-i18next';
import { MarginSparcer, Container, Row } from '../components/Grid';
import WarningIcon from '../assets/icons/alert-circle.svg';



const WarningCard = styled.div`
  width: 100%;
  h1 {
    font-size: 3rem;
  }
`;


const WarningReasonRow = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 50px;
`;


const WarningReasonCell = styled.div`
  min-width: 300px;
  min-height: 300px;
  margin: 20px;
  background: white;
  border-radius: 20px;
  filter: drop-shadow(0px 1px 7px rgb(212, 212, 212));
  transform: translateZ(0); // Enable GPU rendering on iOS devices
  overflow: hidden;
  padding: 0;
  padding: 20px;

  h1 {
    font-size: 2rem;
    margin: 0;
  }

   p {
     width: 100%;
     font-weight: bold;
   }
`;


class Warning extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>lin9.me</NavBrand>
        </Navigation>
        <Container>
          <Row>
            <WarningCard>
              <h1>Requested site has been blocked!</h1>
              <h2>This link was disabled by following reason:</h2>
              <WarningReasonRow>
                <WarningReasonCell>
                  <h1>Violent content</h1>
                  <p>This content may include violent content such as </p>
                </WarningReasonCell>
                <WarningReasonCell>
                  <h1>Sexual content</h1>
                </WarningReasonCell>
                <WarningReasonCell>
                  <h1>Vulgar crowd content</h1>
                </WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
                <WarningReasonCell></WarningReasonCell>
              </WarningReasonRow>
            </WarningCard>
          </Row>
          <Row right bottom>
            <h2>If you want to access this site, press </h2>  
            <Button>Continue</Button>
            <h2>.</h2>
          </Row>
        </Container>
        <MarginSparcer/>
      </>
    );
  }
}

export default withTranslation('auth')(Warning);
