import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

export const LoadingMessage = styled.h1`
  text-align: center;
  font-weight: bold;
  font-size: x-large;
  color: ${({ theme }) => theme.colors.dark_brown};
`;
