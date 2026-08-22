import {
  getExecutives as getExecutiveRecords,
  ExecutiveRecord,
} from '@domain/executives/repository/executives.repository';

export async function getExecutives(): Promise<ExecutiveRecord[]> {
  return getExecutiveRecords();
}
