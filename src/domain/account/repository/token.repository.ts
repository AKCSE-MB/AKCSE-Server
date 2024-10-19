import prismaClient from '@root/src/common/database/prisma';

export async function saveToken(param: {
  accountId: number;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: Date;
  refreshTokenExpiredAt: Date;
}) {
  return await prismaClient.tokens.create({ data: param });
}

export async function getTokenByAccountId(accountId: number) {
  return prismaClient.tokens.findFirst({
    where: { accountId },
  });
}
