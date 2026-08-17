import { Executive as ExecutiveEntity } from '@prisma/client';
import prismaClient from '@common/database/prisma';

export interface ExecutiveRecord {
  id: number;
  name: string;
  position: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExecutivesRepository {
  getExecutives(): Promise<ExecutiveRecord[]>;
}

export class ExecutivesRepository implements IExecutivesRepository {
  async getExecutives(): Promise<ExecutiveRecord[]> {
    const records = await prismaClient.executive.findMany({
      orderBy: { id: 'asc' },
    });

    return records.map(toExecutiveRecord);
  }
}

const executivesRepository = new ExecutivesRepository();

export async function getExecutives(): Promise<ExecutiveRecord[]> {
  return executivesRepository.getExecutives();
}

function toExecutiveRecord(record: ExecutiveEntity): ExecutiveRecord {
  return {
    id: record.id,
    name: record.name,
    position: record.position,
    imageUrl: record.image_url ?? '',
    createdAt: record.created_at,
    updatedAt: record.updated_at,
  };
}
