import React from 'react';
import styled from 'styled-components';

export const UrlText = styled.h1`
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 2rem;
`;


const UrlTextLinkableStyle = styled.a`
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: blue;
`;


export class UrlTextLinkable extends React.Component {

    render() {
        return (
            <UrlTextLinkableStyle href={this.props.children} target="_blank">{this.props.children}</UrlTextLinkableStyle>
        );
    }
}
