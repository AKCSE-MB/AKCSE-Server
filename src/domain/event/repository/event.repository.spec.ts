import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveEvents,
  saveEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from '@domain/event/repository/event.repository';

describe('members repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should save events', async () => {
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

    const res = await saveEvent(data);
    expect(res).not.toBeNull();
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

  it('should update events', async () => {
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

    const expected = {
      description: 'new-test-description',
      fee: 222_777,
      location: 'new-test-location',
    };

    const eventId = 1;
    await saveEvent(data);
    const res = await updateEvent(eventId, expected);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(eventId);
    expect(res.description).toEqual(expected.description);
    expect(res.fee).toEqual(expected.fee);
    expect(res.location).toEqual(expected.location);
  });

  it('should delete events', async () => {
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
    const res = await deleteEvent(eventId);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(eventId);
    expect(res.title).toEqual(data.title);
    expect(res.description).toEqual(data.description);
    expect(res.fee).toEqual(data.fee);
    expect(res.location).toEqual(data.location);
  });
});