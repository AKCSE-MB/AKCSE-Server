import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveEvents,
  saveEvent,
  getEvents,
} from '@domain/event/repository/event.repository';

describe('members repository', () => {
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
});
