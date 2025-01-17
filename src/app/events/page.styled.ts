import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 100px;
`;

export const Title = styled.h1`
  font-weight: bolder;
  font-size: x-large;
  padding: 15px;
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 50px;
  padding-bottom: 50px;
`;

export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.gray};
  height: 300px;

  &:hover {
    cursor: pointer;
  }
`;

export const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const EventInfo = styled.div`
  padding: 10px;
`;

export const LocationAndDate = styled.p`
  font-size: large;
  color: ${({ theme }) => theme.colors.dark_brown};
  margin-top: 20px;
`;

export const EventTitle = styled.h2`
  margin-top: 10px;
  font-size: x-large;
  color: ${({ theme }) => theme.colors.dark_brown};
`;
