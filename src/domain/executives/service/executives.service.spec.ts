import * as executivesRepository from '@domain/executives/repository/executives.repository';
import { ExecutiveRecord } from '@domain/executives/repository/executives.repository';
import { getExecutives } from '@domain/executives/service/executives.service';

describe('executives service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return an empty array when the repository has no executives', async () => {
    jest.spyOn(executivesRepository, 'getExecutives').mockResolvedValueOnce([]);

    const res = await getExecutives();

    expect(res).toEqual([]);
  });

  it('should return whatever the repository returns', async () => {
    const executives: ExecutiveRecord[] = [
      {
        id: 1,
        name: 'test-name',
        position: 'test-position',
        imageUrl: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    jest
      .spyOn(executivesRepository, 'getExecutives')
      .mockResolvedValueOnce(executives);

    const res = await getExecutives();

    expect(res).toEqual(executives);
  });

  it('should delegate to the repository exactly once', async () => {
    const spy = jest
      .spyOn(executivesRepository, 'getExecutives')
      .mockResolvedValueOnce([]);

    await getExecutives();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
