import styled from 'styled-components';


export const Container = styled.div`
    margin-left: 50px;
    margin-right: 50px;
    width: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-content: center;

    @media screen and (max-width: 480px ){
        margin-left: 8px;
        margin-right: 8px;
    }
`;


export const Row = styled.div`
    margin: 10px;
    display: flex;
    justify-content: ${ props => props.right ? "flex-end" : "space-around"};
    align-items: center;
`;

export const MarginSparcer = styled.div`
    height: 10px;
`;
