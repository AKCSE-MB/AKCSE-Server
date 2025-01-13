import { CallerWrongUsageException } from '@common/exception/internal.exception';
import { truncateTables } from '@root/jest.setup';
import prismaClient from '@common/database/prisma';
import {
  createResource,
  getAllResources,
  getResource,
  editResource,
  removeResource,
} from '@domain/resources/service/resources.service';

describe('resources service', () => {
  beforeEach(async () => {
    await truncateTables(prismaClient, ['resources']);
  });

  it('should return the new resource', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };
    const resourceId = 1;

    await createResource({ ...dto });

    const res = await getResource(resourceId);

    expect(res).not.toBeNull();
    expect(res).toHaveProperty('id');
    expect(res).toHaveProperty('title');
    expect(res).toHaveProperty('description');
    expect(res).toHaveProperty('academicCalendarUrl');
  });

  it('should return all resources', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };

    await createResource({ ...dto });
    await createResource({ ...dto });

    const res = await getAllResources();
    const expectedNumResources = 2;

    expect(res).not.toEqual([]);
    expect(res.length).toEqual(expectedNumResources);
  });

  it('no resources, should return an empty array', async () => {
    const res = await getAllResources();
    expect(res).toEqual([]);
  });

  it('should return a member with the passed id', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };

    await createResource({ ...dto });
    const resourceId = 1;
    const res = await getResource(resourceId);

    expect(res).not.toBeNull();
  });

  it('should return a resource with an updated title, description, courseList, prerequisites, expectedDuration, aproxTuitionInternational, aproxTuitionDomestic, and academicCalendarUrl', async () => {
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

    await createResource({ ...dto });

    const resourceId = 1;
    const res = await editResource(resourceId, { ...expected });

    expect(res).not.toBeNull();
    expect(res.id).toEqual(resourceId);
    expect(res.title).toEqual(expected.title);
    expect(res.description).toEqual(expected.description);
    expect(res.academicCalendarUrl).toEqual(expected.academicCalendarUrl);
  });

  it('should throw an error with the message since the deleted resource cannot be retreived', async () => {
    const dto = {
      title: 'Computer Science',
      description: 'Description',
      courseList: ['COMP 1010', 'COMP 1020', 'COMP 2140'],
      prerequisites: ['COMP 1010', 'COMP 1020', 'MATH 1240'],
      expectedDuration: 4,
      aproxTuitionInternational: 22600,
      aproxTuitionDomestic: 6500,
      academicCalendarUrl:
        'https://catalog.umanitoba.ca/undergraduate-studies/science/computer-science/computer-science-bsc-major/',
    };
    const resourceId = 1;

    await createResource({ ...dto });
    await removeResource(resourceId);

    await expect(getResource(resourceId)).rejects.toThrowError(
      CallerWrongUsageException,
    );
  });
});
