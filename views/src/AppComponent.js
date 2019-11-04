import React from 'react';
import styled from 'styled-components';


// lin9me migration
import { Button } from './components/Buttons';
import { withTranslation } from 'react-i18next';



export const Margin = styled.div`
  width: 0;
  height: 30px;
`;

export const VacantMessage = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #383838;
  
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;



// lin9.me deprecation warning
const RedirectNotification = styled.div`
  width: 80%;
  min-height: 200px;
  background: white;
  border-radius: 10px;
  filter: drop-shadow(0px 1px 7px rgb(212, 212, 212));
  transform: translateZ(0); // Enable GPU rendering on iOS devices
  margin-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  
  @media (prefers-color-scheme: dark) {
    color: white;
    background: #242424;
    filter: drop-shadow(0px 1px 7px rgb(24, 24, 24));
  }

  strong {
    color: #e8102d;
  }

  p {
    font-size: 1.4rem;
  }

  a {
    color: #036bfc;
  }
  
  Button {
    margin-left: 10px;
  }
`;


const RNRow = styled.div`
  display: flex;
  justify-content: flex-end;
`;


class MigrationNotice extends React.Component {

  render() {
  
    const { t } = this.props;

    return (
      <>
        <RedirectNotification>
          <h1>{t('Notice.Title')}</h1>
          <p>
            <strong>{t('Notice.1S')}</strong>{t('Notice.1')}<a href="https://2oo.pw">2oo.pw</a>.
          </p>
          <p>
            {t('Notice.2')}<strong>{t('Notice.2S')}</strong>{t('Notice.3')}
          </p>
          <p>
            {t('Notice.ex')}  https://lin9.me/Ojk0I → https://2oo.pw/Ojk0I
          </p>
          <RNRow>
            <Button onClick={() => { window.location.href = "https://2oo.pw";}}>{t('Notice.Go')}</Button>
          </RNRow>
        </RedirectNotification>
      </>
    )
  }
}

export default withTranslation('notice')(MigrationNotice);
