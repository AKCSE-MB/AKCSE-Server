import authRepository from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface UseUserReturn {
  isLoggedIn: boolean;
  login: (identification: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export default function useUser(): UseUserReturn {
  const { push } = useRouter();
  const tokenName = 'token';
  const loginMsgName = 'loginMsg';
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem(tokenName);
    setIsLoggedIn(!!token);
  }, []);

  const loginMutation = useMutation(authRepository().postLogin, {
    onSuccess: (res) => {
      const token = res.accessToken;
      sessionStorage.setItem(tokenName, token);
      sessionStorage.setItem(loginMsgName, 'Log In Successful!');
      setIsLoggedIn(true);
      push('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      setIsLoggedIn(false);
      toast.error('Log In Failed, Please Try Again!');

      return;
    },
  });

  const login = async (
    identification: string,
    password: string,
  ): Promise<boolean> => {
    await loginMutation.mutateAsync({ identification, password });
    return true;
  };

  const logout = () => {
    sessionStorage.removeItem(tokenName);
    sessionStorage.setItem(loginMsgName, 'Log Out Successful!');
    setIsLoggedIn(false);
    push('/login');
  };

  return { isLoggedIn, login, logout };
}
