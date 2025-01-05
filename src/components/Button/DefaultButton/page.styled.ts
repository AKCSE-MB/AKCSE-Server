import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary.dark_brown};
  width: fit-content;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.brown};
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;
