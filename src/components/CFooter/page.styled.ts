import styled from 'styled-components';

export const Container = styled.div`
  padding-bottom: 15px;
  text-align: center;
  color: white;
  background-color: #39170e;
  position: fixed;
  width: 100%;
  max-width: 390px;
  bottom: 0;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const LinkContainer = styled.div`
  padding: 32px 38px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LinkItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  position: relative;
  display: flex;
  color: white;
  width: fit-content;
  flex-direction: column;
  cursor: pointer;

  &:not(:last-child)::after {
    content: '';
    display: inline-block;
    width: 1px;
    height: 20px;
    margin: 0 10px;
    vertical-align: middle;
  }
`;

export const SnsContainer = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
`;

export const SnsItem = styled.div`
  width: 32px;
  cursor: pointer;

  svg {
    width: 32px;
  }
`;

export const CopyrightText = styled.p`
  font-size: 10px;
  color: white;
  line-height: 24px;
`;
