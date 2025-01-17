import { ErrorSubCategoryEnum } from '@root/src/common/exception/enum';
import { InternalDomainException } from '@root/src/common/exception/internal.exception';
import axios from 'axios';

export async function getKakaoUserData(code: string) {
  try {
    const accessToken = await getAccessToken(code);
    const res = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
    console.log(res?.data?.id);

    return res?.data?.id;
  } catch (error) {
    throw new InternalDomainException(
      ErrorSubCategoryEnum.UNEXPECTED_STATUS,
      'failed to login kakao',
    );
  }
}

async function getAccessToken(code: string) {
  const tokenUrl = 'https://kauth.kakao.com/oauth/token';
  const data = {
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_CLIENT_ID,
    code: code,
  };

  try {
    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error(
      'Error fetching access token:',
      error.response ? error.response.data : error.message,
    );
    throw new InternalDomainException(
      ErrorSubCategoryEnum.UNEXPECTED_STATUS,
      'failed to login kakao',
    );
  }
}
