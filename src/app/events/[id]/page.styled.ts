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
  margin-bottom: 10px;
`;

export const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 90%;
`;

export const EventImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  box-shadow: 0 4px 6px ${({ theme }) => theme.colors.gray};
`;

export const EventContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  overflow: hidden;
  text-decoration: none;
  padding: 10px;
`;

export const LocationAndDate = styled.p`
  font-size: large;
  color: ${({ theme }) => theme.colors.dark_brown};
`;

export const EventDescription = styled.p`
  padding-top: 30px;
`;

export const EventFee = styled.p`
  padding-top: 20px;
`;

export const EventDurationContainer = styled.div`
  padding-top: 20px;
`;

export const EventRSVPContainer = styled.div`
  padding-top: 20px;
`;

export const EventRSVP = styled.a`
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.blue};
    cursor: pointer;
  }
`;

export const LoadingMsgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingMsg = styled.h1`
  font-weight: bold;
  font-size: x-large;
  color: ${({ theme }) => theme.colors.dark_brown};
`;
