/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from '@src/env.validation';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import SuperTest from 'supertest';

export const assertStatusCode = (
  res: SuperTest.Response,
  expectedStatus: number = 200,
): SuperTest.Response => {
  if (res.status === expectedStatus) {
    console.log(`response body: ${JSON.stringify(res.body)}`);
    return res;
  }
  const reqData = JSON.parse(JSON.stringify(res)).req;
  throw new Error(` 
  request-method  : ${JSON.stringify(reqData.method)} 
  request-url     : ${JSON.stringify(reqData.url)}
  request-data    : ${JSON.stringify(reqData.data)}
  request-headers : ${JSON.stringify(reqData.headers)}
  response-status  : ${JSON.stringify(res.status)}
  response-body    : ${JSON.stringify(res.body)}
  `);
};

let appServiceFixture: CallableFunction;
let appModuleFixture: CallableFunction;
beforeAll(async () => {
  appServiceFixture = async (
    providers: Provider<any>[],
  ): Promise<TestingModule> => {
    return await Test.createTestingModule({
      providers: providers,
      imports: [
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          validate,
        }),
      ],
    }).compile();
  };

  appModuleFixture = async (
    controllers: any[],
    providers: Provider<any>[],
    importers: any[] = [],
  ): Promise<TestingModule> => {
    return await Test.createTestingModule({
      controllers,
      providers,
      imports: [
        ...importers,
        ConfigModule.forRoot({
          cache: true,
          isGlobal: true,
          validate,
        }),
      ],
    }).compile();
  };
});

type tableNames =
  | 'accounts'
  | 'tokens'

async function truncateTables(prisma: PrismaClient, tableNames: tableNames[]) {
  const url = prisma['_engineConfig'].env.DATABASE_URL;

  for (const name of tableNames) {
    await prisma.$queryRawUnsafe(
      `TRUNCATE "${name}" RESTART IDENTITY CASCADE;`,
    );
  }
}

function createUserToken(
  userId: number,
  secretKey: string,
  options: jwt.SignOptions,
) {
  return jwt.sign({ userId }, secretKey, options);
}

export { appServiceFixture, appModuleFixture, truncateTables, createUserToken };
