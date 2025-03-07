import { truncateTables } from '@root/jest.setup';
import {
  getAkcseEventById,
  getAkcseEvents,
  getPastEvents,
} from '@domain/event/service/event.service';
import prismaClient from '@common/database/prisma';
import { saveEvent } from '@domain/event/repository/event.repository';

describe('event service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  afterAll(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should return all events', async () => {
    const data1 = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(2100, 1, 1),
      endDateTime: new Date(2100, 1, 1),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };

    // this will go into past since the time will pass by the time we call the fcn
    const data2 = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };

    const data3 = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(2020, 1, 1),
      endDateTime: new Date(2020, 1, 1),
      location: 'test-location',
      signUpDeadline: new Date(),
      updatedAt: new Date(),
    };

    await saveEvent(data1);
    await saveEvent(data2);
    await saveEvent(data3);

    const res = await getAkcseEvents();
    const expectedUpcoming = 1;
    const expectedPast = 2;

    console.log(res);

    expect(res).not.toBeNull();
    expect(res.upcoming.length).toEqual(expectedUpcoming);
    expect(res.past.length).toEqual(expectedPast);
  });

  it('should return a past event', async () => {
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
