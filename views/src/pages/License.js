import React from 'react';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import TermDoc from './shared/Terms';
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
        <MarginSparcer />
        <Container>
          <Row>
            <TermDoc/>
          </Row>
        </Container>
      </>
    );
  }
}

export default withTranslation()(LicenseDoc);
