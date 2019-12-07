import React from 'react';
import { Button, CopyButton } from './components/Buttons';
import { Navigation, NavBrand, NavArea, NavItems, NavLink } from './components/Navigation';
import { Margin, VacantMessage } from './AppComponent'; 
import {
  CardBottom, CardCol, CardColPreviewImage,
  CardSiteDesctiption, CardTitle, CardDescription, CardControlArea } from './components/Card';
import { QRImage } from './components/QRImage';
import { Input } from './components/Input';
import { Heading } from './components/Heading';
import './App.scss';


import { withTranslation } from 'react-i18next';
import { APIClient } from './services/APIClient';
import { Validator, ValidationType } from './services/Validator';

// lin9.me deprecation warning
import { Container, Row } from './components/Grid';
import MigrationNotice from './AppComponent';


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      originUrl: ""
    }

    this.requestShorten = this.requestShorten.bind(this);
  }

  onChangeOrigin = (origin) => {
    this.setState({ originUrl: origin });
  }

  requestShorten() {
    if (this.validateUrl(this.state.originUrl)) return;
  
    APIClient.POST("/shorten_link", {origin: this.state.originUrl }, (data) => {
      
      var newData = this.state.data.slice()
      newData.push(data)

      this.setState({
        data: newData
      });
    });
  }

  validateUrl(url) {
    const { t } = this.props;
 
    var message = (!Validator.validate(ValidationType.Empty, url)) ?
      t('Error.EmptyURL')
    : (!Validator.validate(ValidationType.URL, url)) ?
      t('Error.InvalidURL')
    : "";

    if (message.length !== 0) alert(message);
    
    return (message.length !== 0) ? true : false;
  }

  saveToClipboard(str) {
    let textArea = document.createElement("textarea");
    textArea.style.cssText = "position:absolute; left:-100%";
    document.body.appendChild(textArea);
    textArea.value = str;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }


  shareActionsheet(title, description, image, shorten) {
    this.saveToClipboard(shorten);

    ((navigator.share) ?
      navigator.share({
        title: title,
        text: description,
        url: shorten,
      })
      : this.saveToClipboard(shorten)
    );
  }

  downloadQR(url) {
    var elm = document.createElement("a");
    elm.href = url;
    elm.download = "Generated_QR.png"
    elm.click();
  }

  renderCard(title, description, image, shorten, shortenID) {

    return (
      <CardCol onClick={() => this.shareActionsheet(title, description, image, shorten)}>
        <CardColPreviewImage src={image}/>
        <CardSiteDesctiption>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardSiteDesctiption>
        <CardControlArea>
          <CopyButton onClick={() => this.saveToClipboard(shorten)}>Copy</CopyButton>
          <QRImage src={ "https://2oo.pw/web/qr/" + shortenID} onClick={() => this.downloadQR("https://2oo.pw/web/qr/" + shortenID)}/>
        </CardControlArea>
      </CardCol>
    );
  }

  renderList() {
    const { t } = this.props;

    if (this.state.data.length === 0)
      return (
        <VacantMessage>{t('Card.InitMessage')}</VacantMessage>
      );

    return this.state.data.map( item => {
      return (
        <>
        {
          this.renderCard(item.title, item.description, item.image, item.shorten,
                                      item.shorten.replace("https://2oo.pw/", ""))
        }
        </>
      );
    });
  }

  render() {
    const { t } = this.props;


    // lin9.me deprecation warning
    if (window.location.hostname.match("lin9.me"))
      return (
        <>
          <Navigation>
            <NavBrand>lin9.me => 2ooU!</NavBrand>
          </Navigation>
          <Container>
            <Row>
              <MigrationNotice/>
            </Row>
          </Container>
        </>
      );
    
        
    return (
      <>
        <Navigation>
          <NavBrand>2ooU!</NavBrand>
          <NavArea>
            <NavItems>
              <NavLink to='/m/signin'>Signin</NavLink>
            </NavItems>
          </NavArea>
        </Navigation>
        <div className="App">
          <Heading>{t('Top.Message')}</Heading>
          <div className="warp">
            <Input placeholder="http://example.com" onChange={ e => this.onChangeOrigin(e.target.value)}/>
            <Button onClick={this.requestShorten}>{t('Top.Button')}</Button>
          </div>
        </div>
        <CardBottom>
          <Margin/>
            {
              this.renderList()
            }
          <Margin/>
        </CardBottom>
      </>
    );
  }
}


export default withTranslation()(App);
