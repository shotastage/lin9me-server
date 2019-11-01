import React from 'react';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import Plus from '../assets/icons/plus.svg';
import Compass from '../assets/icons/compass.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';

import { withTranslation } from 'react-i18next';


import { Name, BlankImage, ProfList, ProfileImage } from './ProfManagerComponent';



class ProfileManager extends React.Component {

  constructor(props) {
    super(props)
  }
 
  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>Profile</NavBrand>
        </Navigation>
        <ProfileImage/>
      </>
    );
  }
}


export default withTranslation()(ProfileManager);
