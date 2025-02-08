import { truncateTables } from '@root/jest.setup';
import {
  saveAkcseEvent,
  getAkcseEvents,
  getAkcseEventById,
  updateAkcseEvent,
  deleteAkcseEvent,
} from '@domain/event/service/event.service';
import prismaClient from '@common/database/prisma';

describe('event service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should save event', async () => {
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

    const res = await saveAkcseEvent(data);
    expect(res).not.toBeNull();
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

    await saveAkcseEvent(data);

    const res = await getAkcseEvents();
    expect(res).not.toBeNull();
    expect(res).toHaveLength(1);
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
    await saveAkcseEvent(data);

    const res = await getAkcseEventById(eventId);
    expect(res).not.toBeNull();
  });

  it('should update event', async () => {
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
    await saveAkcseEvent(data);
    const res = await updateAkcseEvent(eventId, expected);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(eventId);
    expect(res.description).toEqual(expected.description);
    expect(res.fee).toEqual(expected.fee);
    expect(res.location).toEqual(expected.location);
  });

  it('should delete event', async () => {
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

    await saveAkcseEvent(data);

    const eventId = 1;
    await saveAkcseEvent(data);
    const res = await deleteAkcseEvent(eventId);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(eventId);
    expect(res.title).toEqual(data.title);
    expect(res.description).toEqual(data.description);
    expect(res.fee).toEqual(data.fee);
    expect(res.location).toEqual(data.location);
  });
});
