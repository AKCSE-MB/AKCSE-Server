import { truncateTables } from '@root/jest.setup';
import { loadFixture } from '@root/test/utils/db-test-helper';
import prismaClient from '@common/database/prisma';
import { getExecutives } from '@domain/executives/repository/executives.repository';

const DELIVERY_BASE = 'https://res.cloudinary.com/test-cloud/image/upload';

describe('executives repository', () => {
  const originalCloudName = process.env.CLOUDINARY_CLOUD_NAME;

  beforeAll(() => {
    process.env.CLOUDINARY_CLOUD_NAME = 'test-cloud';
  });

  afterAll(() => {
    process.env.CLOUDINARY_CLOUD_NAME = originalCloudName;
  });

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
          bio: 'test-bio',
          image: {
            publicId: 'team/test-image',
            full: `${DELIVERY_BASE}/w_1200,c_limit,f_auto,q_auto/team/test-image`,
          },
        }),
        expect.objectContaining({
          name: 'test-name-2',
          bio: '',
          image: null,
        }),
      ]),
    );
    expect(res).toHaveLength(2);
  });
});
