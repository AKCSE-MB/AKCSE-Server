import { CallerWrongUsageException } from '@common/exception/internal.exception';
import { ErrorSubCategoryEnum } from '@common/exception/enum';
import {
  saveResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} from '@domain/resources/repository/resources.repository';

export async function createResource(param: {
  id: number;
  title: string;
  description: string;
  courseList: string[];
  prerequisites: string[];
  expectedDuration: number;
  aproxTuitionInternational: number;
  aproxTuitionDomestic: number;
  academicCalendarUrl: string;
}) {
  await saveResource({
    id: param.id,
    title: param.title,
    description: param.description,
    courseList: param.courseList,
    prerequisites: param.prerequisites,
    expectedDuration: param.expectedDuration,
    aproxTuitionInternational: param.aproxTuitionInternational,
    aproxTuitionDomestic: param.aproxTuitionDomestic,
    academicCalendarUrl: param.academicCalendarUrl,
  });
}

export async function getAllResources() {
  return await getResources();
}

export async function getResource(id: number) {
  const resource = await getResourceById(id);

  if (!resource) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'no such resource',
    );
  }

  return resource;
}

export async function editResource(
  id: number,
  param: {
    description?: string;
    courseList?: string[];
    prerequisites?: string[];
    expectedDuration?: number;
    aproxTuitionInternational?: number;
    aproxTuitionDomestic?: number;
    academicCalendarUrl?: string;
  },
) {
  const resource = updateResource(id, param);

  if (!resource) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'invalid update data',
    );
  }

  return resource;
}

export async function removeMember(id: number) {
  return await deleteResource(id);
}
