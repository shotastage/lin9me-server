import styled from 'styled-components';

export const Card = styled.div`
    width: 80%;
    margin-top: 15vh;
    margin-right: 10%;
    margin-bottom: -20px;
    bottom: 0;
    margin-left: 10%;
    min-height: 300px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    background: #fff;
    border-bottom: none;
    box-sizing: border-box;
    filter: drop-shadow(0px 1px 7px rgb(212, 212, 212));



    @media screen and (max-width: 480px) {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        margin-top: 30px;
    }

    @media (prefers-color-scheme: dark) {
        color: white;
        background: #232423;
        border: solid 1px #fff;
        border-bottom: none;
    }
`;


export const CardCol = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 25px;
    margin-left: 25px;
    overflow: hidden;
    background: white;
    border-radius: 15px;
    min-height: 140px;
    filter: drop-shadow(0px 1px 5px rgb(212, 212, 212));


    @media screen and (max-width: 480px) {
        margin-right: 15px;
        margin-left: 15px;
    }

    @media (prefers-color-scheme: dark) {
        color: white;
        background: #232423;
    }
`;


export const CardColPreviewImage = styled.img`
    width: auto;
    height: 146px;
    object-fit: cover;
    object-position: 100% 100%;
    margin-right: 10px;

    @media screen and (max-width: 480px) {
        width: 100px;
    }
`;

export const CardSiteDesctiption = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

export const CardTitle = styled.h1`
    width: 600px;
    overflow: hidden;
    white-space: nowrap;
    font-size: 2rem;

    @media screen and (min-width: 481px) and (max-width: 1200px) {
        width: 450px;
    }

    @media screen and (max-width: 480px) {
        font-size: 1rem;
        width: 120px;
    }
`; 


export const CardDescription = styled.p`
    font-weight: bold;
    width: 600px;
    overflow: hidden;
    white-space: nowrap;

    @media screen and (min-width: 481px) and (max-width: 1200px) {
        width: 450px;
    }

    @media screen and (max-width: 480px) {
        width: 120px;
        height: 65px;
        font-size: 0.7rem;
        white-space: normal;
        overflow-y: hidden;
    }
`;
