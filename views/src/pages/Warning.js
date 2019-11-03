import React from 'react';
import styled from 'styled-components';
import { Navigation, NavBrand } from '../components/Navigation';
import { Button } from '../components/Buttons';
import { CardCell } from '../components/CardCell';
import { withTranslation } from 'react-i18next';
import { MarginSparcer, Container, Row } from '../components/Grid';
import WarningIcon from '../assets/icons/alert-circle.svg';
import { WarningCard, WarningReasonRow, WarningReasonCell } from './WarningComponent';



class Warning extends React.Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>2ooU!</NavBrand>
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
              </WarningReasonRow>
            </WarningCard>
          </Row>
          <Row right bottom>
            <h2>If you want to access this site, press </h2>  
            <Button>Continue</Button>
          </Row>
        </Container>
        <MarginSparcer/>
      </>
    );
  }
}

export default withTranslation('auth')(Warning);
