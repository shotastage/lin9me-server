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
    border-radius: 15px;
    background: #d43333;
    font-weight: bold;
    font-size: 1.5rem;
    font-family: 'Roboto Condensed', sans-serif;
    margin: 25px;

    &:focus {
	    outline:0;
    }

    &:hover {
        letter-spacing: 1.5px;
        background: #333;
        color: white;
    }

    @media screen and (max-width: 480px) {
        width: 140px;
        font-size: 1.3rem;
    }
`;


export const CopyButton = styled(Button)`
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    width: 77px;
    min-width: 77px;
    font-size: 1rem;
    background: #2440c9;
    color: white;

    &:hover {
        letter-spacing: 1px;
    }

    @media screen and (max-width: 480px) {
        display: none;
    }
`;
