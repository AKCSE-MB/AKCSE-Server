export interface CreateTokenRequest {
    identification: string;
    password: string;
}

export interface TokenDTO {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: Date;
    refreshTokenExpiredAt: Date;
}