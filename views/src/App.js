import React from 'react';
import { Button, CopyButton } from './components/Buttons';
import { Navigation, NavBrand } from './components/Navigation';
import { Margin, VacantMessage } from './AppComponent'; 
import {
  Card, CardCol, CardColPreviewImage,
  CardSiteDesctiption, CardTitle, CardDescription, CardControlArea } from './components/Card';
import { QRImage } from './components/QRImage';
import { Input } from './components/Input';
import { Heading } from './components/Heading';
import './App.scss';


import { withTranslation } from 'react-i18next';
import APIClient from './services/APIClient';



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
 
    var message = (url === "" || url === undefined) ?
      t('Error.EmptyURL')
    : (url.match(/^(https?|bhaa|wifi)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/) === null) ?
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
          <QRImage src={ "https://lin9.me/web/qr/" + shortenID} onClick={() => this.downloadQR("https://lin9.me/web/qr/" + shortenID)}/>
        </CardControlArea>
      </CardCol>
    );
  }

  renderList(t) {

    if (this.state.data.length === 0)
      return (
        <VacantMessage>{t('Card.InitMessage')}</VacantMessage>
      );

    return this.state.data.map( item => {
      return (
        <>
        {
          this.renderCard(item.title, item.description, item.image, item.shorten,
                                      item.shorten.replace("https://lin9.me/", ""))
        }
        </>
      );
    });
  }

  render() {
    const { t } = this.props;
    return (
      <>
        <Navigation>
          <NavBrand>lin9.me</NavBrand>
        </Navigation>
        <div className="App">
        <Heading>{t('Top.Message')}</Heading>

          <div className="warp">
            <Input placeholder="http://example.com" onChange={ e => this.onChangeOrigin(e.target.value)}/>
            <Button onClick={this.requestShorten}>{t('Top.Button')}</Button>
          </div>
        </div>
        <Card>
          <Margin/>
            {
              this.renderList(t)
            }
          <Margin/>
        </Card>
      </>
    );
  }
}


export default withTranslation()(App);
