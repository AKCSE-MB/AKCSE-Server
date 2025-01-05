import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 25px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 360px;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }

  button {
    justify-content: flex-start;
  }
`;

export const TitleContainer = styled.div`
  font-family: 'Pretendard', serif;
  text-align: center;

  h1,
  h2 {
    color: ${({ theme }) => theme.colors.primary.dark_brown};
  }

  h1 {
    font-weight: bolder;
    font-size: large;
  }

  h2 {
    font-weight: normal;
    font-size: small;
  }
`;

export const MenuButton = styled.button`
  position: absolute;
  height: 24px;
  width: 24px;
  margin-left: 10px;
  border: none;
  cursor: pointer;
`;

export const BackButton = styled.button`
  margin-top: 10px;
  height: 48px;
  width: 48px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const SideMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const MenuItem = styled.div`
  padding: 10px 0;
  cursor: pointer;
  font-family: 'Pretendard', serif;
  font-size: medium;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.brown};
  }
`;

export const Title = styled.h1``;

export const SubTitle = styled.h2``;

export const ButtonContainer = styled.div``;
