import * as eventsRepository from '@domain/events/repository/events.repository';
import { EventRecord } from '@domain/events/repository/events.repository';
import { getEvents } from '@domain/events/service/events.service';

describe('events service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return an empty array when the repository has no events', async () => {
    jest.spyOn(eventsRepository, 'getEvents').mockResolvedValueOnce([]);

    const res = await getEvents();

    expect(res).toEqual([]);
  });

  it('should return whatever the repository returns', async () => {
    const events: EventRecord[] = [
      {
        id: 1,
        title: 'test-title',
        description: 'test-description',
        fee: 100_000,
        startDateTime: new Date('2500-01-01'),
        endDateTime: new Date('2500-01-02'),
        location: 'test-location',
        signUpDeadline: new Date('2500-01-01'),
        rsvpLink: '',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest.spyOn(eventsRepository, 'getEvents').mockResolvedValueOnce(events);

    const res = await getEvents();

    expect(res).toEqual(events);
  });

  it('should delegate to the repository exactly once', async () => {
    const spy = jest
      .spyOn(eventsRepository, 'getEvents')
      .mockResolvedValueOnce([]);

    await getEvents();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
