import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  saveResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from '@domain/resources/repository/resources.repository';

describe('resource repository', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['resources']);
  });

  it('should return a new resource', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };
    const resourceId = 1;

    await saveResource({ ...dto });

    const res = await getResourceById(resourceId);

    expect(res).not.toBeNull();
  });

  it('should return all resources', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };

    await saveResource({ ...dto });
    await saveResource({ ...dto });

    const res = await getResources();

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(2);
  });

  it('no resources, should return an empty array', async () => {
    const res = await getResources();
    expect(res).toEqual([]);
  });

  it('should return a resource with the passed id', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };
    const resourceId = 1;

    await saveResource({ ...dto });

    const res = await getResourceById(resourceId);

    expect(res).not.toBeNull();
  });

  it('resource does not exist, should be null', async () => {
    const resourceId = 100;
    const res = await getResourceById(resourceId);

    expect(res).toBeNull;
  });

  it('should return a resource with an updated title, description, and academicCalendarUrl', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };

    const expected = {
      title: 'Computer Science2',
      description: 'Description2',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };

    const resourceId = 1;

    await saveResource({ ...dto });

    const res = await updateResource(resourceId, { ...expected });

    expect(res).not.toBeNull();
    expect(res.id).toEqual(resourceId);
    expect(res.title).toEqual(expected.title);
    expect(res.description).toEqual(expected.description);
    expect(res.academicCalendarUrl).toEqual(expected.academicCalendarUrl);
  });

  it('should not be able to return a resource after deletion', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };
    const resourceId = 1;

    await saveResource({ ...dto });
    await deleteResource(resourceId);

    const res = await getResourceById(resourceId);

    expect(res).toBeNull();
  });
});
