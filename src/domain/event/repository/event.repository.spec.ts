import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveEvents,
  saveEvent,
  getEvents,
  getEventById,
} from '@domain/event/repository/event.repository';

describe('event repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should return events', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };

    await saveEvent(data);
    const res = await getEvents();
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
  });

  it('should return events', async () => {
    const data = [
      {
        title: 'test-title',
        description: 'test-description',
        fee: 100_000,
        startDateTime: new Date(),
        endDateTime: new Date(),
        location: 'test-location',
        signUpDeadline: new Date(),
        updatedAt: new Date(),
      },
    ];

    await saveEvents(data);
    const res = await getEvents();
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
  });

  it('should return an empty array', async () => {
    const res = await getEvents();
    expect(res).toEqual([]);
  });

  it('should return an event with the passed id', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };
    const eventId = 1;

    await saveEvent(data);
    const res = await getEventById(eventId);

    expect(res).not.toBeNull();
  });

  it('event does not exist, should be null', async () => {
    const eventId = 100;
    const res = await getEventById(eventId);

    expect(res).toBeNull;
  });
});
