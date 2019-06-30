import React from 'react';
import styled from 'styled-components';
import './App.scss';
import { Button, CopyButton } from './components/Buttons';

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
  width: 400px;
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
  font-size: 4rem;
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
      <div className="App">
        <Heading>Lin9</Heading>
        <p>A simple & minimum URL shortener</p>

        <main>
          <Input placeholder="http://example.com" onChange={ e => this.onChangeOrigin(e.target.value)}/>
          <Button onClick={this.requestShorten}>Shorten</Button>
        </main>
        <div>
          <ShortenInput value={this.state.shorten_url}/>

        </div>
      </div>
    );
  }
}


export default App;
