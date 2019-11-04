import React from 'react';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import Plus from '../assets/icons/plus.svg';
import Compass from '../assets/icons/compass.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';

import { AuthRequired } from '../services/Auth';


import { withTranslation } from 'react-i18next';


import { Name, BlankImage, ProfList, ProfileImage } from './ProfManagerComponent';



class ProfileManager extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const { t } = this.props;

    return (
      <AuthRequired>
        <Navigation>
          <NavBrand>Profile</NavBrand>
        </Navigation>
        <Container>
          <MarginSparcer/>
          <Row>
            <BlankImage onClick={this.register}>
              <object type="image/svg+xml" aria-labelledby="" data={Plus}/> 
            </BlankImage>
            <Name>Unkown Name</Name>
          </Row>
          <MarginSparcer/>
          <Row>
            <ProfList type="web" desc="Main official web site.">https://shotastage.xyz</ProfList>
          </Row>
          <Row>
            <ProfList type="twitter" desc="Main Twitter account.">@shotastage</ProfList>
          </Row>
          <Row>
            <ProfList type="instagram" desc="Main Instagram account.">@shotastage</ProfList>
          </Row>
        </Container>
        <MarginSparcer/>
      </AuthRequired>
    );
  }
}


export default withTranslation()(ProfileManager);
