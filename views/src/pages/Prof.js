import React from 'react';
import styled from 'styled-components';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';
import { Heading } from '../components/Heading';
import '../App.scss';

import Compass from '../assets/icons/compass.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';

import { withTranslation } from 'react-i18next';



const Name = styled.h1`
  font-size: 5rem;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }

  @media (prefers-color-scheme: dark) {
    color: white;  
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
   
  ListType = {
    web : 1,
    twitter : 2,
    instagram : 3,
    facebook : 4
  };

  list = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 70%;
    height: 170px;
    background: rgb(243, 243, 243);

    @media screen and (max-width: 480px ){
      width: 100%;
      height: 100px;
    }

    @media (prefers-color-scheme: dark) {
      background: rgb(43, 43, 43);
    }
  `;

  listIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 110px;
    margin-left: 50px;
    object {
      width: 105px;
      height: 105px;
    }
    border-radius: 50%;

    @media screen and (max-width: 480px) {
      width: 60px;
      height: 60px;
      margin-left: 20px;
      object {
        width: 55px;
        height: 55px;
      }
    }
  `;

  listText = styled.h1`
    margin-right: 50px;

    @media screen and (max-width: 480px) {
      margin-right: 20px;
      font-size: 1.2rem;
    }

    @media (prefers-color-scheme: dark) {
      color: white;  
    }
  `;


  render() {
    return (
      <>
        <this.list>
          <this.listIcon>
            { (this.props.type === "web" ) && <object type="image/svg+xml" data={Compass}></object> }
            { (this.props.type === "twitter" ) && <object type="image/svg+xml" data={Twitter}></object> }
            { (this.props.type === "instagram" ) && <object type="image/svg+xml" data={Instagram}></object> }
          </this.listIcon>
          <this.listText onClick={
            () => {
              if (this.props.type === "web")
                window.location.href = this.props.children;

              if (this.props.type === "twitter")
                window.location.href = "https://twitter.com/" + this.props.children.replace('@', '');

              if (this.props.type === "instagram")
                window.location.href = "https://www.instagram.com/" + this.props.children.replace('@', '') + "/";
            }
          }>{this.props.children}</this.listText>
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
            <ProfList type="web">https://shotastage.xyz</ProfList>
          </Row>
          <Row>
            <ProfList type="twitter">@shotastage</ProfList>
          </Row>
          <Row>
            <ProfList type="instagram">@shotastage</ProfList>
          </Row>
        </Container>
        <MarginSparcer/>
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
      </>
    );
  }
}


export default withTranslation()(Profile);
