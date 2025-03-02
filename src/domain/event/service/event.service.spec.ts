import { truncateTables } from '@root/jest.setup';
import {
  getAkcseEventById,
  getUpcomingEvents,
  getPastEvents,
} from '@domain/event/service/event.service';
import prismaClient from '@common/database/prisma';
import { saveEvent } from '@domain/event/repository/event.repository';

describe('event service', () => {
  afterEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should return event', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(2100, 1, 1),
      endDateTime: new Date(2100, 1, 1),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };

    await saveEvent(data);

    const res = await getUpcomingEvents();
    expect(res).not.toBeNull();
  });

  it('should return event', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(2020, 1, 1),
      endDateTime: new Date(2020, 1, 1),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };

    await saveEvent(data);
    const res = await getPastEvents();
    expect(res).not.toBeNull();
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
    const res = await getAkcseEventById(eventId);

    expect(res).not.toBeNull();
  });
});
