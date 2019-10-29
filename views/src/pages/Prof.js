import React from 'react';
import styled from 'styled-components';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import { Heading } from '../components/Heading';
import '../App.scss';

import Compass from '../assets/icons/compass.svg';

import { withTranslation } from 'react-i18next';



const Name = styled.h1`
  font-size: 5rem;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;


const BlankImage = styled.div`
  background: #f5f5f5;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px ){
    width: 100px;
    height: 100px;
  }
`;



class ProfList extends React.Component {

  list = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 70%;
    height: 170px;
    background: rgb(243, 243, 243);

    @media screen and (max-width: 480px ){
      width: 100%;
      height: 100px;
    }
  `;

  listIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 110px;
    object {
      width: 105px;
      height: 105px;
    }
    border-radius: 50%;

    @media screen and (max-width: 480px) {
      width: 60px;
      height: 60px;
      object {
        width: 55px;
        height: 55px;
      }
    }
  `;

  listText = styled.h1`
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    }
  `;


  render() {
    return (
      <>
        <this.list>
          <this.listIcon>
            <object type="image/svg+xml" data={Compass}></object>
          </this.listIcon>
          <this.listText>https://shotastage.xyz</this.listText>
        </this.list>
      </>
    );
  }
}


class ProfileImage extends React.Component {

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
        <Container>
          <MarginSparcer/>
          <Row>
            <BlankImage onClick={this.register}>
              +
            </BlankImage>
            <Name>YOUR NAME</Name>
          </Row>
          <MarginSparcer/>
          <Row>
            <ProfList/>
          </Row>
          <Row>
            <ProfList/>
          </Row>
          <Row>
            <ProfList/>
          </Row>
        </Container>
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
