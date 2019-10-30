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



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      originUrl: "",
      shortenUrl: "",
      dataOrigin: [],
      dataShorten: [],
      dataCount: [],
      dataTitle: [],
      dataDescription: [],
      dataImage: [],
    }

    this.requestShorten = this.requestShorten.bind(this);
  }

  entryPoint(str) {
    var hostName = document.location.hostname;

    return (
      (hostName === "localhost" || hostName === "127.0.0.1") ?
        "http://localhost:8080" + str
      :
        "https://lin9.me" + str
      );
  }

  onChangeOrigin = (origin) => {
    this.setState({ originUrl: origin });
  }

  requestShorten() {
    var origin = this.state.originUrl;

    if (this.validateUrl(origin)) return;
  
    const method = "POST"
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var body = JSON.stringify({origin: this.state.originUrl });

    fetch(this.entryPoint("/shorten_link"), {method, headers, body})
        .then(res => res.json())
        .then((data) => {
          var dataShorten = this.state.dataShorten.slice(),
            dataOrigin = this.state.dataOrigin.slice(),
            dataTitle = this.state.dataTitle.slice(),
            dataDescription = this.state.dataDescription.slice(),
            dataImage = this.state.dataImage.slice();

          dataOrigin.push(origin)
          dataShorten.push(data.shorten)
          dataTitle.push(data.title)
          dataDescription.push(data.description)
          dataImage.push(data.image)

          this.setState({
            dataOrigin: dataOrigin,
            dataShorten: dataShorten,
            dataTitle: dataTitle,
            dataDescription: dataDescription,
            dataImage: dataImage
          })
        })
        .catch(console.log)
  }

  validateUrl(url) {
    const { t } = this.props;
 
    var message = (url === "" || url === undefined) ?
      t('Error.EmptyURL')
    : (url.match(/^(https?|bhaa|wifi)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/) === null) ?
      t('Error.InvalidURL')
    : "";

    if (message.length != 0) alert(message);
    
    return (message.length != 0) ? true : false;
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

  render() {
    const { t } = this.props;

    return (
      <>
        <Navigation>
          <NavBrand>lin9.me</NavBrand>
        </Navigation>
        <div className="App">
        <Heading>{t('Top.Message')}</Heading>

          <div class="warp">
            <Input placeholder="http://example.com" onChange={ e => this.onChangeOrigin(e.target.value)}/>
            <Button onClick={this.requestShorten}>{t('Top.Button')}</Button>
          </div>
        </div>
        <Card>
          <Margin/>
          {(() => {
            var origin = this.state.dataOrigin,
              shorten = this.state.dataShorten,
              title = this.state.dataTitle,
              description = this.state.dataDescription,
              image = this.state.dataImage,
              cols = [];


            if (origin.length === 0) {
              return (
                <VacantMessage>{t('Card.InitMessage')}</VacantMessage>
              )
            }

            for (let i = 0; i < origin.length; i++) {

              var shortenID = shorten[i].replace("https://lin9.me/", "");
              shortenID = shorten[i].replace("https://lin9.me/", "");

              cols.push(
                <>
                  <CardCol onClick={() => this.shareActionsheet(title[i], description[i], image[i], shorten[i])}>
                    <CardColPreviewImage src={image[i]}/>
                    <CardSiteDesctiption>
                      <CardTitle>{title[i]}</CardTitle>
                      <CardDescription>{description[i]}</CardDescription>
                    </CardSiteDesctiption>
                    <CardControlArea>
                      <CopyButton onClick={() => this.saveToClipboard(shorten[i])}>Copy</CopyButton>
                      <QRImage src={ "https://lin9.me/web/qr/" + shortenID} onClick={() => this.downloadQR("https://lin9.me/web/qr/" + shortenID)}/>
                    </CardControlArea>
                  </CardCol>
                </>
              );
            }

            return cols;

          })()}
          <Margin/>
        </Card>
      </>
    );
  }
}


export default withTranslation()(App);
