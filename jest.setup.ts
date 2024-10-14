/* eslint-disable @typescript-eslint/no-explicit-any */
import { Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { validate } from '@src/env.validation';


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

export { appServiceFixture, appModuleFixture };
