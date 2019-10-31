import React from 'react';
import styled from 'styled-components';
import { Navigation, NavBrand } from '../components/Navigation';
import { Button } from '../components/Buttons';
import { withTranslation } from 'react-i18next';
import { MarginSparcer, Container, Row } from '../components/Grid';
import TermDoc from './shared/Terms';


const AuthCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border: solid 2px #dedede;
  border-radius: 15px;
  width: 45%;
  min-height: 500px;
  padding: 15px;
  padding-top: 0;
  margin-top: 90px;

  @media screen and (max-width: 480px ) {
    width: 100%;
    min-height: 400px;
    border: none;
    margin-top: 30px;
  }
`;


const AuthCardHeadings = styled.div`

  h1, p {
    font-weight: bold;
    text-align: center;
  }

  h1 {
    font-size: 2.7rem;
  }
`;



const Input = styled.input`
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  font-weight: bold;
  padding: 0.4em 0.8em;
  width: 60%;
  height: 40px;
  border-radius: 10px;
  border: none;
  background: #e6e6e6;
  margin-top: 10px;

  &:focus {
    border: 1px solid rgba(0, 0, 0, 0.32);
    box-shadow: none;
    outline: none;
    border: solid 3px #3b79ff;
  }

  @media screen and (max-width: 480px ) {
    width: 80%;
  }
`;


const ScrollableDoc = styled.div`
  height: 200px;
  overflow-y: scroll;
  background: #ededed;
  border-radius: 10px;
  padding: 4px;
`;


class SignUp extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentPage: "email",
      email: false,
      password: false,
      agreement: false
    }
  }

  switchPage(page) {
    this.setState({
      currentPage: page,
    })
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
            { (this.state.currentPage === "email") &&
              <AuthCard>
                <AuthCardHeadings>
                  <h1>{t('SignUp.Title')}</h1>
                  <p>{t('SignUp.Description')}</p>
                </AuthCardHeadings>
                <Input placeholder="Email"/>
                <Button onClick={() => this.switchPage("password")}>{t('SignUp.SubmitMail')}</Button>
              </AuthCard>
            }

            { (this.state.currentPage === "password") &&
              <AuthCard>
                <AuthCardHeadings>
                  <h1>{t('SignUp.Title')}</h1>
                  <p>{t('SignUp.DescriptionPass')}</p>
                </AuthCardHeadings>
                <Input placeholder="Password" type="password"/>
                <Button onClick={() => this.switchPage("agreement")}>{t('SignUp.SubmitPass')}</Button>
              </AuthCard>
            }

            { (this.state.currentPage === "agreement") &&
              <AuthCard>
                <AuthCardHeadings>
                  <h1>{t('SignUp.TitleAgreement')}</h1>
                  <p>{t('SignUp.DescriptionAgreement')}</p>
                </AuthCardHeadings>
                <ScrollableDoc>
                  <TermDoc/>
                </ScrollableDoc>
                <Button>{t('SignUp.SubmitAgreement')}</Button>
              </AuthCard>
            }
          </Row>
        </Container>
        <MarginSparcer/>
      </>
    );
  }
}

export default withTranslation('auth')(SignUp);