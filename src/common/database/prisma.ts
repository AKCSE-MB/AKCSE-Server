import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from '@domain/configuration/configuration.service';

const configService = new ConfigurationService(new ConfigService());
const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: configService.getDataBaseUrl() || '',
      },
    },
  });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prismaClient: PrismaClientSingleton | undefined;
};

const prismaClient = globalForPrisma.prismaClient ?? prismaClientSingleton();

export default prismaClient;

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prismaClient = prismaClient;
