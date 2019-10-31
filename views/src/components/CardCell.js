import styled from 'styled-components';


export const CardCell = styled.div`
    min-width: 300px;
    min-height: 400px;
    margin: 20px;
    background: white;
    border-radius: 20px;
    filter: drop-shadow(0px 1px 7px rgb(212, 212, 212));
    transform: translateZ(0); // Enable GPU rendering on iOS devices
    overflow: hidden;
    padding: 20px;

    h1, p {
        color: white;
    }

    h1 {
        font-size: 2rem;
        margin: 0;
    }

    p {
        width: 100%;
        font-weight: bold;
    }
`;
