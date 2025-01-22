export interface CreateTokenRequest {
  code: string;
}

export interface TokenDTO {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: Date;
  refreshTokenExpiredAt: Date;
}
