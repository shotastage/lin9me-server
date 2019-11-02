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
    width: 100%;
    margin: 10px;
    display: flex;
    justify-content: ${ props => props.right ? "flex-end" : "space-around"};
    align-items: center;
    flex-wrap: wrap;
`;

export const MarginSparcer = styled.div`
    height: 10px;
`;


export const GridContainer = styled.div`
     display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    grid-auto-rows: 1fr;
    grid-gap: 2em;
    border: 1px solid #ddd;
    padding: 2em;
    margin: 0 0 1em;

    > div {
        overflow: auto;
        min-width: 0;
        padding: 1.1em;
    }
`;
