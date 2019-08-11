import styled from 'styled-components';

export const Navigation = styled.nav`
    z-index: 100;
    background: #fff;
    width: 100%;
    height: 70px;
    margin: 0;

    @media screen and (max-width: 480px){
        height: 60px;
        filter: none;
    }

    @media (prefers-color-scheme: dark) {
        color: white;
        background: #232423;
    }
`;


export const NavBrand = styled.h1`
    height: 70px;
    line-height: 70px;
    font-family: 'Lora', serif;
    font-size: 1.7rem;
    margin: 0;
    padding-left: 25px;

    @media screen and (max-width: 480px){
        height: 60px;
        line-height: 60px;
        padding-left: 15px;
    }
`;
