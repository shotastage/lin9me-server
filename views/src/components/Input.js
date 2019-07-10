import styled from 'styled-components';

export const Input = styled.input`
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
