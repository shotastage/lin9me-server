import styled from 'styled-components';
import { CardCell } from '../components/CardCell';


export const WarningCard = styled.div`
  width: 100%;
  h1 {
    font-size: 3rem;
  }
`;


export const WarningReasonRow = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 50px;
`;


export const WarningReasonCell = styled(CardCell)`
  min-width: 300px;
  min-height: 300px;
  background: #f2463a;

  h1, p {
    color: white;
  }
`;
