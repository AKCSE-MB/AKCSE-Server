import styled from 'styled-components';

export const LayoutWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;
export const Layout = styled.div`
  position: relative;
  max-width: 360px;
  margin: 0 auto;
  width: 100%;
  background-color: rgb(255, 251, 246);

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;
export const LogoWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 360px;
  height: 44px;
  z-index: 1;

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  svg {
    width: 360px;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
`;
