'use client';

import * as S from './page.styled';
import Header from '@/components/Header/MainHeader';
import TextInput from '@/components/Input/TextInput';
import DefaultButton from '@/components/Button/DefaultButton';
import { useEffect, useState } from 'react';
import useUser from '@/hooks/useUser';
import { toast, ToastContainer } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  useEffect(() => {
    const loginMessage = sessionStorage.getItem('loginMsg');
    if (loginMessage) {
      toast.success(loginMessage);
      sessionStorage.removeItem('loginMsg');
    }
  }, []);

  const handleLogIn = async () => {
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login Failed:', error);
    }
  };

  return (
    <>
      <S.MainContainer>
        <Header title="AKCSE MANITOBA" subTitle="Young Generations" BackBtn />

        <S.LoginWrapper>
          <S.HeaderContainer>
            <S.Title>Log In</S.Title>
            <S.SubTitle>AKCSE MB Admin Access</S.SubTitle>
          </S.HeaderContainer>

          <TextInput
            placeholder="Email"
            value={email}
            onChange={(email) => setEmail(email.target.value)}
          />

          <TextInput
            placeholder="Password"
            type="password"
            value={password}
            onChange={(pass) => setPassword(pass.target.value)}
          />

          <S.ButtonContainer>
            <DefaultButton onClick={handleLogIn}>Log In</DefaultButton>
            <ToastContainer position="bottom-center" />
          </S.ButtonContainer>
        </S.LoginWrapper>
      </S.MainContainer>
    </>
  );
}
