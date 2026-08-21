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

export async function getExecutives(): Promise<ExecutiveRecord[]> {
  const records = await prismaClient.executive.findMany();

  return records.map(toExecutiveRecord);
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
