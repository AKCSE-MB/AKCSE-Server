'use client';

import Header from '@/components/Header';
import * as S from './page.styled';
import useUser from '@/hooks/useUser';
import { useEffect } from 'react';

export default function LoginCallback() {
  const { login } = useUser();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // window.location.search로 쿼리 문자열을 가져옴
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code'); // 'code'라는 파라미터 값 추출

        if (code) {
          await login(code); // Pass the code to login
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <S.MainContainer>
      <Header title="AKCSE MANITOBA" subTitle="Young Generations" />
      <S.LoadingMessage>Logging In...</S.LoadingMessage>
    </S.MainContainer>
  );
}
