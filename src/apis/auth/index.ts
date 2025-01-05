import http from '../http';
import {
  CreateTokenRequest,
  TokenDTO,
} from '@dev-taeho/akcse_mb/lib/domain/account/dto/account.dto';

interface AuthRepository {
  postLogin: ({
    identification,
    password,
  }: CreateTokenRequest) => Promise<TokenDTO>;
}

const authRepository = (): AuthRepository => {
  return {
    postLogin: async ({ identification, password }) =>
      await http.post<TokenDTO, CreateTokenRequest>('/apis/v1/account/tokens', {
        identification,
        password,
      }),
  };
};

export default authRepository;
