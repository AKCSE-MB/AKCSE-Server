import { truncateTables } from '@root/jest.setup';
import { getAkcseEvents } from '@domain/event/service/event.service';
import prismaClient from '@common/database/prisma';
import { saveEvent } from '@domain/event/repository/event.repository';

describe('event service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should return event', async () => {
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

    const res = await getAkcseEvents();
    expect(res).not.toBeNull();
  });
});
