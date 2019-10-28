import React from 'react';
import styled from 'styled-components';
import { Navigation, NavBrand } from '../components/Navigation';
import { Heading } from '../components/Heading';
import '../App.scss';


import { withTranslation } from 'react-i18next';


class ProfileImage extends React.Component {

  blankImage = styled.div`
    background: #f5f5f5;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  registredImage = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 50%;
  `;


  
  register() {
    const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.txt, text/plain';
      input.click();

  }

  render() {
    const { t } = this.props;

    return (
      <>
        <this.blankImage onClick={this.register}>
          +
        </this.blankImage>
      </>
    );
  }
}

class Profile extends React.Component {

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
        <Heading>{t('Profile.Message.Description')}</Heading>  
      </>
    );
  }
}


export default withTranslation()(Profile);
