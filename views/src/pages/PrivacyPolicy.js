import React from 'react';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import PlivacyDoc from '../components/PrivacyPolicy';
import { withTranslation } from 'react-i18next';



class PrivacyPolicy extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>Privacy Policy</NavBrand>
        </Navigation>
        <MarginSparcer />
        <Container>
          <Row>
            <PlivacyDoc/>
          </Row>
        </Container>
      </>
    );
  }
}


export default withTranslation()(PrivacyPolicy);
