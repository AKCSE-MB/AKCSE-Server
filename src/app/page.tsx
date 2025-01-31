'use client';

import { useRouter } from 'next/navigation';
import * as S from './page.styled';
import DefaultButton from '@/components/Button/DefaultButton';
import Header from '@/components/Header/MainHeader';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  const { push } = useRouter();

  return (
    <S.MainContent>
      <Header title="AKCSE MANITOBA" subTitle="Young Generations" />

      <S.ButtonContainer>
        <DefaultButton onClick={() => push('/')}>HOME</DefaultButton>
        <DefaultButton onClick={() => push('/events')}>EVENTS</DefaultButton>
        <DefaultButton onClick={() => push('/')}>RESOURCES</DefaultButton>
        <DefaultButton onClick={() => push('/leaderboard')}>
          LEADERBOARD
        </DefaultButton>
      </S.ButtonContainer>
      <ToastContainer position="bottom-center" />
    </S.MainContent>
  );
}
