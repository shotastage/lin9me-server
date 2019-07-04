import styled from 'styled-components';

export const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    padding: 0;
    appearance: none;

    display: inline-block;
    width: 180px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    color: white;
    border-radius: 30px;
    background: linear-gradient(-45deg, rgb(255, 151, 224) 0%, rgb(255, 0, 76) 100%);
    box-shadow: 0 5px 10px rgba(255, 0, 76, .5);
    font-weight: bold;
    font-size: 1.5rem;
    font-family: 'Roboto Condensed', sans-serif;

    margin: 25px;
    &:hover {
        $color: rgb(255, 0, 76);
        animation: halftone 1s forwards;
        background: radial-gradient(circle, $color 0.2em, transparent 0.25em) 0 0 / 1.25em 1.25em
              , radial-gradient(circle, $color 0.2em, transparent 0.25em) 6.25em 6.25em / 1.25em 1.25em;
        color: adjust-hue($color ,180);
        box-shadow: none;
        text-decoration: none;
        color: #fff;
    }

    &:focus {
	    outline:0;
    }

`;


export const CopyButton = styled(Button)`
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    width: 77px;
    min-width: 77px;
    font-size: 1rem;
    background: linear-gradient(-45deg, rgb(151, 187, 255) 0%, rgb(10, 65, 247) 100%);
    box-shadow: 0 5px 10px rgba(10, 65, 247, .5);

    &:hover {
        $color: rgb(10, 65, 247);

        background: radial-gradient(circle, $color 0.2em, transparent 0.25em) 0 0 / 1.25em 1.25em
              , radial-gradient(circle, $color 0.2em, transparent 0.25em) 6.25em 6.25em / 1.25em 1.25em;
        color: adjust-hue($color ,180);
    }

    @media screen and (max-width: 480px) {
        display: none;
    }
`;
