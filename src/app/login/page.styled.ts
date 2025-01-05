import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px;
`;

export const LoginWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 100px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;

  h1 {
    font-size: large;
    font-weight: bold;
  }

  h2 {
    font-size: small;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Title = styled.h1``;

export const SubTitle = styled.h2``;
