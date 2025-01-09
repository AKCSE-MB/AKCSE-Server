import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextInput = styled.input`
  padding-top: 10px;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 10px;
  width: 300px;
  border-radius: 5px;
  font-size: 1rem;
  background-color: white;
  color: black;
  border: 2px solid ${({ theme }) => theme.colors.dark_brown};
  cursor: text;
`;

export const StyledLabel = styled.label`
  justify-content: left;
  color: ${({ theme }) => theme.colors.dark_brown};
  font-weight: bold;
  font-size: medium;
  margin-bottom: 5px;
`;
