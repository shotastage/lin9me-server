import React from 'react';
import styled from 'styled-components';

export const UrlText = styled.h1`
    height: 60px;
    line-height: 60px;
    font-size: 2rem;

    @media screen and (max-width: 1155px) {
        display: none;
    }
`;


const UrlTextLinkableStyle = styled.a`
    height: 60px;
    line-height: 60px;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: blue;

    @media screen and (max-width: 480px) {
        font-size: 0.7rem;
    }
`;


export class UrlTextLinkable extends React.Component {

    render() {
        return (
            <UrlTextLinkableStyle href={this.props.children} target="_blank">{this.props.children}</UrlTextLinkableStyle>
        );
    }
}
