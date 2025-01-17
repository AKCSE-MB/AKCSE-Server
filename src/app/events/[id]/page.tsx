'use client';

import * as S from './page.styled';
import Header from '@/components/Header/MainHeader';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GetEventsOutput } from '@dev-taeho/akcse_mb/lib/domain/event/dto/event.dto';
import { getFormattedDate, getFormattedTime } from '@/utils/formatUtil';
import { getEventById } from '@/apis/events';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState<GetEventsOutput>();

  useEffect(() => {
    const fetchEvents = async () => {
      const event = await getEventById(Number(id));
      if (event) {
        setEvent(event);
      }
    };

    fetchEvents();
  }, [id]);

  return (
    <S.MainContainer>
      <Header title="AKCSE MANITOBA" subTitle="Young Generations" BackBtn />

      {event && (
        <>
          <S.EventWrapper>
            <S.Title>{event.title}</S.Title>
            <S.EventImage src={event.imageUrl} alt={event.title} />
            <S.EventContainer>
              <S.LocationAndDate>
                {event.location} • {getFormattedDate(event.startDateTime)}
              </S.LocationAndDate>
              <S.EventDescription>{event.description}</S.EventDescription>
              <S.EventDurationContainer>
                From: {getFormattedDate(event.startDateTime)} @{' '}
                {getFormattedTime(event.startDateTime)}
                To: {getFormattedDate(event.endDateTime)} @{' '}
                {getFormattedTime(event.endDateTime)}
              </S.EventDurationContainer>
              <S.EventFee>Fee: ${event.fee}</S.EventFee>
              <S.EventRSVPContainer>
                RSVP Deadline: {getFormattedDate(event.signUpDeadline)} @{' '}
                {getFormattedTime(event.signUpDeadline)}
                <S.EventRSVP href={event.rsvpLink} target="blank">
                  Sign Up
                </S.EventRSVP>
              </S.EventRSVPContainer>
            </S.EventContainer>
          </S.EventWrapper>
        </>
      )}
    </S.MainContainer>
  );
}
