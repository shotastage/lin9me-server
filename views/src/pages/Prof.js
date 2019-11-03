import React from 'react';
import styled from 'styled-components';
import { Container, Row, MarginSparcer } from '../components/Grid';
import { Navigation, NavBrand } from '../components/Navigation';

import Plus from '../assets/icons/plus.svg';
import Compass from '../assets/icons/compass.svg';
import Twitter from '../assets/icons/twitter.svg';
import Instagram from '../assets/icons/instagram.svg';

import { withTranslation } from 'react-i18next';



const Name = styled.h1`
  font-size: 5rem;

  @media screen and (max-width: 480px) { font-size: 2rem; }
  @media (prefers-color-scheme: dark) { color: white; }
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


const AvatarImage = styled.img`
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

  listTextArea = styled.div`
    margin-right: 50px;

    @media screen and (max-width: 480px) {
      margin-right: 20px;
    }
  `;

  listText = styled.h1`
    text-align: right;

    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    }

    @media (prefers-color-scheme: dark) {
      color: white;  
    }
  `;

  listDescription = styled.p`
    text-align: right;
  
    @media (prefers-color-scheme: dark) {
      color: white;  
    }
  `;

    


  render() {
    return (
      <>
        <this.list>
          <this.listIcon>
            { (this.props.type === "web" ) && <object type="image/svg+xml" aria-labelledby="" data={Compass}></object> }
            { (this.props.type === "twitter" ) && <object type="image/svg+xml" aria-labelledby="" data={Twitter}></object> }
            { (this.props.type === "instagram" ) && <object type="image/svg+xml" aria-labelledby="" data={Instagram}></object> }
          </this.listIcon>

          <this.listTextArea onClick={
              () => {
                if (this.props.type === "web")
                  window.location.href = this.props.children;

                if (this.props.type === "twitter")
                  window.location.href = "https://twitter.com/" + this.props.children.replace('@', '');

                if (this.props.type === "instagram")
                  window.location.href = "https://www.instagram.com/" + this.props.children.replace('@', '') + "/";
              }
            }>
            <this.listText>{this.props.children}</this.listText>
            <this.listDescription>{this.props.desc}</this.listDescription>
          </this.listTextArea>
        </this.list>
      </>
    );
  }
}


class Profile extends React.Component {
 
  render() {

    return (
      <>
        <Navigation>
          <NavBrand>Profile</NavBrand>
        </Navigation>
        <Container>
          <MarginSparcer/>
          <Row>
            <AvatarImage src="https://pbs.twimg.com/profile_images/899687993476227075/RzQkQVwS_400x400.jpg"/>
            <Name>Shota Shimazu</Name>
          </Row>
          <MarginSparcer/>
          <Row>
            <p>SFC16 | RG NECO Bhaaとか http://lin9.me とか http://tipstock.net 作ってます</p>
          </Row>
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
      </>
    );
  }
}


export default withTranslation()(Profile);
