'use client';

import * as S from './page.styled';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import { GetEventsOutput } from '@dev-taeho/akcse_mb/lib/domain/event/dto/event.dto';
import { getEvents } from '@/apis/events';
import { useRouter } from 'next/navigation';
import { getFormattedDate } from '@/utils/formatUtil';

export default function Events() {
  const [events, setEvents] = useState<GetEventsOutput[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const events = await getEvents();
      if (events) {
        setEvents(events);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: GetEventsOutput) => {
    push(`/events/${event.id}`);
  };

  return (
    <S.MainContainer>
      <Header title="AKCSE MANITOBA" subTitle="Young Generations" BackBtn />
      <S.Title>Upcoming Events</S.Title>

      <S.EventList>
        {events.map((event) => (
          <S.EventCard key={event.id} onClick={() => handleEventClick(event)}>
            <S.EventImage src={event.imageUrl} alt={event.title} />
            <S.EventInfo>
              <S.LocationAndDate>
                {event.location} • {getFormattedDate(event.startDateTime)}
              </S.LocationAndDate>
              <S.EventTitle>{event.title}</S.EventTitle>
            </S.EventInfo>
          </S.EventCard>
        ))}
      </S.EventList>
    </S.MainContainer>
  );
}
