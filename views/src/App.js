import React from 'react';
import { Button, CopyButton } from './components/Buttons';
import { Navigation, NavBrand } from './components/Navigation';
import { Margin, VacantMessage } from './AppComponent'; 
import { UrlText, UrlTextLinkable, UrlTextCopyable} from './components/UrlText';
import { Card, CardCol, CardColPreviewImage, CardSiteDesctiption, CardTitle, CardDescription } from './components/Card';
import { QRImage } from './components/QRImage';
import { Input } from './components/Input';
import { Heading } from './components/Heading';
import './App.scss';


import { withTranslation } from 'react-i18next';



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      origin_url: "",
      shorten_url: "",
      data_origin: [],
      data_shorten: [],
      data_count: [],
      data_title: [],
      data_desc: [],
      data_img: []
    }

    this.requestShorten = this.requestShorten.bind(this);
  }

  onChangeOrigin = (origin) => {
    this.setState({ origin_url: origin });
  }

  requestShorten() {

    var origin = this.state.origin_url

    if (origin === "" || origin === undefined) {
      alert("URLが空です");
      return
    }

    if (origin.match(/^(https?|bhaa|wifi)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/) === null) {
      alert("不正なURLです. httpもしくはhttpsから始まるURLを指定してください.");
      return
    }

    const method = "POST"
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    var body = JSON.stringify({origin: this.state.origin_url });

    fetch(this.entryPoint("/shorten_link"), {method, headers, body})
        .then(res => res.json())
        .then((data) => {
          var data_shorten = this.state.data_shorten.slice()
          var data_origin = this.state.data_origin.slice()
          var data_title = this.state.data_title.slice()
          var data_desc = this.state.data_desc.slice()
          var data_img = this.state.data_img.slice()



          data_shorten.push(data.shorten)
          data_origin.push(origin)
          data_title.push(data.title)
          data_desc.push(data.description)
          data_img.push(data.image)


          this.setState({ data_shorten: data_shorten })
          this.setState({ data_origin: data_origin })
          this.setState({ data_title: data_title })
          this.setState({ data_desc: data_desc })
          this.setState({ data_img: data_img })
        })
        .catch(console.log)
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
    let textArea = document.createElement("textarea");
    textArea.style.cssText = "position:absolute; left:-100%";
    document.body.appendChild(textArea);
    textArea.value = shorten;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    if (navigator.share) {
        navigator.share({
            title: title,
            text: description,
            url: shorten,
        })
    } else {
        this.saveToClipboard(shorten);
    }
  }

  entryPoint(str) {
    var hostName = document.location.hostname;
    if( hostName === "localhost" || hostName === "127.0.0.1" ){
      return "http://localhost:8080" + str
    }

    return "https://lin9.me" + str
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
            var origin = this.state.data_origin;
            var shorten = this.state.data_shorten;
            var title = this.state.data_title;
            var description = this.state.data_desc;

            var image = this.state.data_img;


            var cols = [];

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
                    <CopyButton onClick={() => this.saveToClipboard(shorten[i])}>Copy</CopyButton>
                    <QRImage src={ this.entryPoint("/web/qr/") + shortenID}/>
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
