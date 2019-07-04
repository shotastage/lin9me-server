import styled from 'styled-components';

export const Card = styled.div`
    width: 80%;
    margin-top: 64vh;
    margin-right: 10%;
    margin-bottom: -20px;
    bottom: 0;
    margin-left: 10%;
    background: pink;
    min-height: 300px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
    background: #fff;
    filter: drop-shadow(0px 0px 3px rgba(0,0,0,.3));

    @media screen and (max-width: 480px) {
        width: 100%;
        margin-left: 0;
        margin-right: 0;
    }
`;


export const CardCol = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
    margin-left: 20px;
    overflow: hidden;
`;
