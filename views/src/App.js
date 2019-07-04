import React from 'react';
import styled from 'styled-components';
import './App.scss';
import { Button, CopyButton } from './components/Buttons';
import { Navigation, NavBrand } from './components/Navigation';
import { UrlText, UrlTextLinkable} from './components/UrlText';
import { Card, CardCol } from './components/Card';

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
  }
`;

const Heading = styled.h1`
  font-family: 'Comfortaa', cursive;
  font-size: 4.5rem;
  font-weight: bold;
  color: rgb(240, 45, 38);
  margin-top: 180px;
`;

const Margin = styled.div`
  width: 0;
  height: 30px;
`;

const Separator = styled.div`
  width: 40%;
  margin-right: 30%;
  margin-left: 30%;
  height: 1px;
  background: #cfcfcf;
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

    fetch('http://localhost:8080/shorten_link', {method, headers, body})
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

            for (let i = 0; i < origin.length; i++) {

              var shortenID = shorten[i].replace("https://lin9.me/", "");
              shortenID = shorten[i].replace("https://lin9.me/", "");

              cols.push(
                <>
                  <CardCol>
                    <UrlText>{origin[i]}</UrlText>
                    <UrlTextLinkable>{shorten[i]}</UrlTextLinkable>
                    <CopyButton onClick={() => this.saveToClipboard(shorten[i])}>Copy</CopyButton>
                    <img src={"https://lin9.me/qr/" + shortenID}/>
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


/*
            <ShortenInput value={this.state.shorten_url}/>

*/
export default App;
