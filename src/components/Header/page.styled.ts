import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  position: fixed;
  top: 0px;
  padding-top: 30px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 360px;
  background: ${({ theme }) => theme.colors.ivory};

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
  padding-bottom: 30px;

  h1,
  h2 {
    color: ${({ theme }) => theme.colors.dark_brown};
  }

  h1 {
    font-weight: bolder;
    font-size: x-large;
  }

  h2 {
    font-weight: normal;
    font-size: medium;
  }
`;

export const MenuButton = styled.button`
  /* position: absolute; */
  /* height: 24px; */
  /* width: 24px; */
  /* margin-left: 10px; */
  /* border: none; */
  /* cursor: pointer; */
`;

export const BackButton = styled.button`
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
  box-shadow: 2px 0 5px ${({ theme }) => theme.colors.gray};
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
    color: ${({ theme }) => theme.colors.brown};
  }
`;

export const Title = styled.h1`
  font-weight: bolder;
  font-size: xx-large;
`;

export const SubTitle = styled.h2`
  font-weight: bold;
  font-size: large;
`;

export const ButtonContainer = styled.div``;
