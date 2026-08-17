import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

export async function loadFixture(
  prisma: PrismaClient,
  filePath: string,
): Promise<void> {
  const sql = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const statements = sql
    .split(';\n')
    .map((statement) => statement.trim())
    .filter((statement) => statement.length > 0);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }
}
