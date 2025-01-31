import http from '../http';
import {
  // CreateTokenRequest,
  TokenDTO,
} from '@dev-taeho/akcse_mb/lib/domain/account/dto/account.dto';

interface CreateTokenRequest {
  code: string;
}

interface AuthRepository {
  postLogin: ({ code }: CreateTokenRequest) => Promise<TokenDTO>;
}

const authRepository = (): AuthRepository => {
  return {
    postLogin: async ({ code }) =>
      await http.post<TokenDTO, CreateTokenRequest>('/apis/v1/account/tokens', {
        code,
      }),
  };
};

export default authRepository;
