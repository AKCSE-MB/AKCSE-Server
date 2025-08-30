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
    };

    await saveEvent({ ...data });
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
    };
    const eventId = 1;

    await saveEvent({ ...data });
    const res = await getEventById(eventId);

    expect(res).not.toBeNull();
  });

  it('event does not exist, should be null', async () => {
    const eventId = 100;
    const res = await getEventById(eventId);

    expect(res).toBeNull;
  });

  it('should return an event with an updated title, description, fee, startDateTime, endDateTime, location, signUpDeadline, rsvpLink, and imageUrl', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: 'test-location',
      signUpDeadline: new Date(),
      rsvpLink: 'test-rsvpLink',
      imageUrl: 'test-imageUrl',
    };

    const expected = {
      title: 'title',
      description: 'description',
      fee: 10,
      startDateTime: new Date('2025-01-01T12:30:00'),
      endDateTime: new Date('2025-01-01T15:30:00'),
      location: 'location',
      signUpDeadline: new Date('2024-12-31T23:59:00'),
      rsvpLink: 'rsvpLink',
      imageUrl: 'imageUrl',
    };
    const eventId = 1;

    await saveEvent({ ...data });
    await updateEvent(eventId, { ...expected });
    const res = await getEventById(eventId);

    expect(res).not.toBeNull();
  });

  it('should not be able to return an event after deletion', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: new Date(),
      endDateTime: new Date(),
      location: 'test-location',
      signUpDeadline: new Date(),
      rsvpLink: 'test-rsvpLink',
      imageUrl: 'test-imageUrl',
    };
    const eventId = 1;
    await saveEvent({ ...data });
    await deleteEvent(eventId);
    const res = await getEventById(eventId);

    expect(res).toBeNull;
  });
});
