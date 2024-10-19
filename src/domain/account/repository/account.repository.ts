import prismaClient from '@common/database/prisma';

export async function saveAccount(param: {
  identification: string;
  password: string;
}) {
  await saveAccounts([param]);
}

export async function saveAccounts(
  param: {
    identification: string;
    password: string;
  }[],
) {
  return prismaClient.accounts.createMany({ data: param });
}

export async function getIdentification(identification: string) {
  return prismaClient.accounts.findFirst({
    where: {
      identification: identification,
    },
  });
}
