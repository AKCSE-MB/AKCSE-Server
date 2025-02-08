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
  title: string;
  description: string;
  academicCalendarUrl: string;
}) {
  await saveResource({
    title: param.title,
    description: param.description,
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
    academicCalendarUrl?: string;
  },
) {
  const resource = await updateResource(id, param);

  if (!resource) {
    throw new CallerWrongUsageException(
      ErrorSubCategoryEnum.INVALID_INPUT,
      'invalid update data',
    );
  }

  return resource;
}

export async function removeResource(id: number) {
  return await deleteResource(id);
}
