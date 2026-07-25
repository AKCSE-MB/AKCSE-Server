import { truncateTables } from '@root/jest.setup';
import { loadFixture } from '@root/test/utils/db-test-helper';
import prismaClient from '@common/database/prisma';
import { getEvents } from '@domain/events/repository/events.repository';

describe('events repository', () => {
  afterEach(async () => {
    await truncateTables(prismaClient, ['events']);
  });

  it('should return an empty array when there are no events', async () => {
    const res = await getEvents();
    expect(res).toEqual([]);
  });

  it('should return all events', async () => {
    await loadFixture(prismaClient, 'test/fixtures/events/events.setup.sql');

    const res = await getEvents();

    expect(res).toHaveLength(1);
    expect(res[0].title).toEqual('test-title-2');
    expect(res[0].rsvpLink).toEqual('test-rsvp-link');
    expect(res[0].imageUrl).toEqual('test-image-url');
    expect(res[1].title).toEqual('test-title-1');
    expect(res[1].rsvpLink).toEqual('');
    expect(res[1].imageUrl).toEqual('');
  });
});
