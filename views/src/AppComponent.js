import styled from 'styled-components';


export const Margin = styled.div`
  width: 0;
  height: 30px;
`;

export const VacantMessage = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: #383838;

  
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;
