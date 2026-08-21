import { truncateTables } from '@root/jest.setup';
import { loadFixture } from '@root/test/utils/db-test-helper';
import prismaClient from '@common/database/prisma';
import { getExecutives } from '@domain/executives/repository/executives.repository';

describe('executives repository', () => {
  afterEach(async () => {
    await truncateTables(prismaClient, ['executives']);
  });

  it('should return an empty array when there are no executives', async () => {
    const res = await getExecutives();
    expect(res).toEqual([]);
  });

  it('should return all executives', async () => {
    await loadFixture(
      prismaClient,
      'test/fixtures/executives/executives.setup.sql',
    );

    const res = await getExecutives();

    expect(res).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'test-name-1',
          position: 'test-position-1',
          imageUrl: 'test-image-url',
        }),
        expect.objectContaining({ name: 'test-name-2', imageUrl: '' }),
      ]),
    );
    expect(res).toHaveLength(2);
  });
});
