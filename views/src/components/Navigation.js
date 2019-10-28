import styled from 'styled-components';

export const Navigation = styled.nav`
    z-index: 100;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    background: white;
    filter: drop-shadow(0px 0px 1px rgb(184, 184, 184));
    width: 100%;
    height: 60px;
    margin: 0;

    @media screen and (max-width: 480px){
        height: 60px;
        filter: none;
    }

    @media (prefers-color-scheme: dark) {
        color: white;
        background: #232423;
        filter: drop-shadow(0px 0px 1px rgb(70, 70, 70));
    }
`;


export const NavBrand = styled.h1`
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
