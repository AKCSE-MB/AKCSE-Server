import { EventRecord } from '@domain/events/repository/events.repository';
import { EventsService } from '@domain/events/service/events.service';

describe('events service', () => {
  let service: EventsService;
  let repository: {
    getEvents: jest.Mock;
  };

  beforeEach(() => {
    repository = {
      getEvents: jest.fn(),
    };

    service = new EventsService(repository as any);
  });

  it('should return an empty array when the repository has no events', async () => {
    repository.getEvents.mockResolvedValueOnce([]);

    const res = await service.getEvents();

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

    repository.getEvents.mockResolvedValueOnce(events);

    const res = await service.getEvents();

    expect(res).toEqual(events);
  });

  it('should delegate to the repository exactly once', async () => {
    repository.getEvents.mockResolvedValueOnce([]);

    await service.getEvents();

    expect(repository.getEvents).toHaveBeenCalledTimes(1);
  });
});
