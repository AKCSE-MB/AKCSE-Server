import styled from 'styled-components';

export const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

export const Title = styled.h1`
  font-weight: bolder;
  font-size: x-large;
  padding: 15px;
  margin-top: 50px;
`;

export const Table = styled.table`
  width: 80%;
  border-collapse: separate;
  border-spacing: 0 5px;
  margin-top: 30px;
  table-layout: fixed;
`;

export const TableHeader = styled.th`
  border-bottom: 2px solid ${({ theme }) => theme.colors.dark_brown};
  padding: 10px;
  text-align: center;
  font-weight: bolder;
  font-size: large;
`;

export const TableData = styled.td`
  text-align: center;
  vertical-align: middle;
  height: 75px;
  font-size: large;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TableRow = styled.tr``;

export const TheadContainer = styled.thead``;

export const TbodyContainer = styled.tbody``;
