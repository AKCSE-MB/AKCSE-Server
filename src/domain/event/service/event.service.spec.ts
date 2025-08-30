import { truncateTables } from '@root/jest.setup';
import {
  getAkcseEventById,
  getAkcseEvents,
  getPastEvents,
  createEvent,
  editEvent,
  removeEvent,
} from '@domain/event/service/event.service';
import prismaClient from '@common/database/prisma';
import { CallerWrongUsageException } from '@root/src/common/exception/internal.exception';

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
      startDateTime: '2500-01-01',
      endDateTime: '2500-01-01',
      location: 'test-location',
      signUpDeadline: '2500-01-01',
    };

    const data2 = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: '2000-01-01',
      endDateTime: '2000-01-01',
      location: 'test-location',
      signUpDeadline: '2000-01-01',
    };

    await createEvent({ ...data1 });
    await createEvent({ ...data2 });

    const res = await getAkcseEvents();
    const expectedUpcoming = 1;
    const expectedPast = 1;

    expect(res).not.toBeNull();
    expect(res.upcoming.length).toEqual(expectedUpcoming);
    expect(res.past.length).toEqual(expectedPast);
  });

  it('should return a past event', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: '2000-01-01',
      endDateTime: '2000-01-01',
      location: 'test-location',
      signUpDeadline: '2000-01-01',
    };

    await createEvent({ ...data });
    const res = await getPastEvents();
    expect(res).not.toBeNull();
  });

  it('should return an event with the passed id', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: '2000-01-01',
      endDateTime: '2000-01-01',
      location: 'test-location',
      signUpDeadline: '2000-01-01',
      updatedAt: '2000-01-01',
    };
    const eventId = 1;

    await createEvent({ ...data });
    const res = await getAkcseEventById(eventId);

    expect(res).not.toBeNull();
  });

  it('should return an event with an updated title, description, fee, startDateTime, endDateTime, location, signUpDeadline, rsvpLink, and imageUrl', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: '2000-01-01',
      endDateTime: '2000-01-01',
      location: 'test-location',
      signUpDeadline: '2000-01-01',
      rsvpLink: 'test-rsvpLink',
      imageUrl: 'test-imageUrl',
    };

    const expected = {
      title: 'title',
      description: 'description',
      fee: 10,
      startDateTime: '2500-01-01',
      endDateTime: '2500-01-01',
      location: 'location',
      signUpDeadline: '2500-01-01',
      rsvpLink: 'rsvpLink',
      imageUrl: 'imageUrl',
    };
    const eventId = 1;

    await createEvent({ ...data });
    await editEvent(eventId, { ...expected });
    const res = await getAkcseEventById(eventId);

    expect(res).not.toBeNull();
    expect(res.id).toEqual(eventId);
    expect(res.title).toEqual(expected.title);
    expect(res.description).toEqual(expected.description);
    expect(res.fee).toEqual(expected.fee);
    expect(res.startDateTime).toEqual(new Date(expected.startDateTime));
    expect(res.endDateTime).toEqual(new Date(expected.endDateTime));
    expect(res.location).toEqual(expected.location);
    expect(res.signUpDeadline).toEqual(new Date(expected.signUpDeadline));
    expect(res.rsvpLink).toEqual(expected.rsvpLink);
    expect(res.imageUrl).toEqual(expected.imageUrl);
  });

  it('should throw an error with the message since the deleted event cannot be retreived', async () => {
    const data = {
      title: 'test-title',
      description: 'test-description',
      fee: 100_000,
      startDateTime: '2000-01-01',
      endDateTime: '2000-01-01',
      location: 'test-location',
      signUpDeadline: '2000-01-01',
      rsvpLink: 'test-rsvpLink',
      imageUrl: 'test-imageUrl',
    };
    const eventId = 1;

    await createEvent({ ...data });
    await removeEvent(eventId);

    await expect(getAkcseEventById(eventId)).rejects.toThrowError(
      CallerWrongUsageException,
    );
  });
});
