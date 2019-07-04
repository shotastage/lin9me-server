import React from 'react';
import styled from 'styled-components';
import './App.scss';
import { Button, CopyButton } from './components/Buttons';
import { Navigation, NavBrand } from './components/Navigation';
import { UrlText, UrlTextLinkable} from './components/UrlText';
import { Card, CardCol } from './components/Card';
import img from './assets/example-qr.png'

const Input = styled.input`
  appearance: none;
  border: none;
  height: 60px;
  width: 400px;
  border-radius: 30px;
  padding-left: 20px;
  font-size: 1.5rem;
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


const ShortenInput = styled.input`
  height: 80px;
  width: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 2rem;
  border: none;
  background: transparent;

  &:focus {
	    outline:0;
  }

  @media screen and (max-width: 480px){
    width: 100%;
  }
`;



const Heading = styled.h1`
  font-family: 'Comfortaa', cursive;
  font-size: 5rem;
  font-weight: bold;
  color: rgb(240, 45, 38);
  margin-top: 180px;
`;



class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      origin_url: "",
      shorten_url: "",
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

    fetch('https://lin9.me/shorten_link', {method, headers, body})
        .then(res => res.json())
        .then((data) => {
          this.setState({ shorten_url: data.shorten })
        })
        .catch(console.log)
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
          <div></div>
          <CardCol>
            <UrlText>https://google.co.jp</UrlText>
            <UrlTextLinkable>https://lin9.me/Y7jh5</UrlTextLinkable>
            <CopyButton>Copy</CopyButton>
            <img src={img}/>
          </CardCol>

          <CardCol>
            <UrlText>https://google.co.jp</UrlText>
            <UrlTextLinkable>https://lin9.me/Y7jh5</UrlTextLinkable>
            <CopyButton>Copy</CopyButton>
            <img src={img}/>
          </CardCol>

          <CardCol>
            <UrlText>https://google.co.jp</UrlText>
            <UrlTextLinkable>https://lin9.me/Y7jh5</UrlTextLinkable>
            <CopyButton>Copy</CopyButton>
            <img src={img}/>
          </CardCol>

          <CardCol>
            <UrlText>https://google.co.jp</UrlText>
            <UrlTextLinkable>https://lin9.me/Y7jh5</UrlTextLinkable>
            <CopyButton>Copy</CopyButton>
            <img src={img}/>
          </CardCol>
        </Card>
      </>
    );
  }
}


/*
            <ShortenInput value={this.state.shorten_url}/>

*/
export default App;
