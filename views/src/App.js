import React from 'react';
import styled from 'styled-components';
import './App.scss';
import { Button, CopyButton } from './components/Buttons';
import { Navigation, NavBrand } from './components/Navigation';
import { UrlText, UrlTextLinkable} from './components/UrlText';
import { Card, CardCol } from './components/Card';
import { QRImage } from './components/QRImage';

const Input = styled.input`
  appearance: none;
  border: none;
  height: 60px;
  width: 400px;
  border-radius: 30px;
  padding-left: 30px;
  letter-spacing: 1px;
  font-size: 1.5rem;
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: bold;
  box-shadow: 0 5px 10px rgba(78, 78, 78, 0.5);

  &:focus {
      outline: 0;
      border: splid 2px red;
  }

  @media screen and (max-width: 480px){
    width: 80%;
    letter-spacing: 0;
    border-radius: 40px;
  }
`;

const Heading = styled.h1`
  font-family: 'Cherry Swash', cursive;
  font-size: 4.5rem;
  font-weight: bold;
  color: rgb(240, 45, 38);
  margin-top: 180px;

  @media screen and (max-width: 800px) {
    margin-top: 140px;
    font-size: 2.5rem;
  }

  @media screen and (max-width: 480px) {
    width: 95%;
    margin-top: 20px;
    font-size: 3.2rem;
  }

  @media only screen
    and (device-width : 414px)
    and (device-height : 896px)
    and (-webkit-device-pixel-ratio : 2) {
      font-size: 4rem;
    }

    @media only screen
    and (device-width : 375px)
    and (device-height : 812px)
    and (-webkit-device-pixel-ratio : 3) {
      font-size: 4rem;
    }

    @media only screen
    and (device-width : 414px)
    and (device-height : 896px)
    and (-webkit-device-pixel-ratio : 3) {
      font-size: 4rem;
    }
`;

const Margin = styled.div`
  width: 0;
  height: 30px;
`;

const VacantMessage = styled.h1`
  text-align: center;
`;


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      origin_url: "",
      shorten_url: "",
      data_origin: [],
      data_shorten: [],
      data_count: []
    }

    this.requestShorten = this.requestShorten.bind(this);
  }

  onChangeOrigin = (origin) => {
    this.setState({ origin_url: origin });
  }

  addCol = (original, shorten) => {

    let qrpath = "/web/qr/" + shorten;

    return (
      <>
        <CardCol>
          <UrlText>{original}</UrlText>
          <UrlTextLinkable>{shorten}</UrlTextLinkable>
          <CopyButton onClick={() => this.saveToClipboard(shorten)}>Copy</CopyButton>
          <img src={qrpath}/>
        </CardCol>
      </>
    );
  }

  requestShorten() {

    var origin = this.state.origin_url

    if (origin === "" || origin === undefined) {
      alert("URLが空です");
      return
    }

    if (origin.match(/^(https?)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/) === null) {
      alert("不正なURLです");
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

          data_shorten.push(data.shorten)
          data_origin.push(origin)

          this.setState({ data_shorten: data_shorten })
          this.setState({ data_origin: data_origin })

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


  entryPoint(str) {
    var hostName = document.location.hostname;
    if( hostName === "localhost" || hostName === "127.0.0.1" ){
      return "http://localhost:8080" + str
    }

    return "https://lin9.me" + str
  }

  render() {
    return (
      <>
        <Navigation>
          <NavBrand>lin9</NavBrand>
        </Navigation>
        <div className="App">
        <Heading>Activate more link capability</Heading>

          <main>
            <div>
              <Input placeholder="http://example.com" onChange={ e => this.onChangeOrigin(e.target.value)}/>
              <Button onClick={this.requestShorten}>Shorten</Button>
            </div>
          </main>
        </div>
        <Card>
          <Margin/>
          {(() => {
            var origin = this.state.data_origin;
            var shorten = this.state.data_shorten;

            var cols = [];

            if (origin.length === 0) {
              return (
                <VacantMessage>Let's shorten your link!</VacantMessage>
              )
            }

            for (let i = 0; i < origin.length; i++) {

              var shortenID = shorten[i].replace("https://lin9.me/", "");
              shortenID = shorten[i].replace("https://lin9.me/", "");

              cols.push(
                <>
                  <CardCol>
                    <UrlText>{origin[i]}</UrlText>
                    <UrlTextLinkable>{shorten[i]}</UrlTextLinkable>
                    <CopyButton onClick={() => this.saveToClipboard(shorten[i])}>Copy</CopyButton>
                    <QRImage src={ this.entryPoint("/web/qr/") + shortenID}/>
                  </CardCol>
                </>
              );
            }

            return cols;

          })()}
        </Card>
      </>
    );
  }
}

export default App;
