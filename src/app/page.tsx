'use client';

import { useRouter } from 'next/navigation';
import * as S from './page.styled';
import DefaultButton from '@/components/Button/DefaultButton';
import Header from '@/components/Header/MainHeader';
import useUser from '@/hooks/useUser';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export default function Home() {
  const { push } = useRouter();
  const { isLoggedIn, logout } = useUser();

  useEffect(() => {
    const successLoginMsg = sessionStorage.getItem('loginMsg');
    if (successLoginMsg) {
      toast.success(successLoginMsg);
      sessionStorage.removeItem('loginMsg');
    }
  }, []);

  return (
    <>
      <S.MainContent>
        <Header title="AKCSE MANITOBA" subTitle="Young Generations" />

        <S.ButtonContainer>
          <DefaultButton onClick={() => push('/')}>HOME</DefaultButton>
          <DefaultButton onClick={() => push('/')}>EVENTS</DefaultButton>
          <DefaultButton onClick={() => push('/')}>RESOURCES</DefaultButton>
          <DefaultButton onClick={() => push('/')}>LEADERBOARD</DefaultButton>
          {isLoggedIn ? (
            <div>
              <DefaultButton onClick={logout}>Log Out</DefaultButton>
              <ToastContainer position="bottom-center" />
            </div>
          ) : (
            <DefaultButton onClick={() => push('/login')}>
              LOG IN / ADMIN
            </DefaultButton>
          )}
        </S.ButtonContainer>
      </S.MainContent>
    </>
  );
}
