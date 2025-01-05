import ARROW from '@/assets/common/logo/arrow.svg';
import MENU from '@/assets/common/logo/menu.svg';
import * as S from './page.styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useUser from '@/hooks/useUser';
import { ToastContainer } from 'react-toastify';

interface Props {
  title: string;
  subTitle?: string;
  BackBtn?: boolean;
}

export default function Header({ title, subTitle, BackBtn }: Props) {
  const { back, push } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useUser();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = () => {
    toggleMenu();
    push('/');
  };

  const handleEventsClick = () => {
    toggleMenu();
    push('/');
  };

  const handleResourcesClick = () => {
    toggleMenu();
    push('/');
  };

  const handleLeaderboardClick = () => {
    toggleMenu();
    push('/');
  };

  const handleLoginClick = () => {
    toggleMenu();
    push('/login');
  };

  return (
    <>
      <S.HeaderWrapper>
        <S.MenuButton onClick={toggleMenu}>
          <MENU />
        </S.MenuButton>

        <S.TitleContainer>
          <S.Title>{title}</S.Title>

          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
        </S.TitleContainer>

        {BackBtn ? (
          <S.ButtonContainer>
            <S.BackButton onClick={back}>
              <ARROW />
            </S.BackButton>
          </S.ButtonContainer>
        ) : (
          <S.ButtonContainer></S.ButtonContainer>
        )}
      </S.HeaderWrapper>

      {isMenuOpen && (
        <S.SideMenu>
          <S.CloseButton onClick={toggleMenu}>×</S.CloseButton>
          <S.MenuItem onClick={handleHomeClick}>Home</S.MenuItem>
          <S.MenuItem onClick={handleEventsClick}>Events</S.MenuItem>
          <S.MenuItem onClick={handleResourcesClick}>Resources</S.MenuItem>
          <S.MenuItem onClick={handleLeaderboardClick}>Leaderboard</S.MenuItem>
          {isLoggedIn ? (
            <div>
              <S.MenuItem onClick={logout}>Log Out</S.MenuItem>
              <ToastContainer />
            </div>
          ) : (
            <S.MenuItem onClick={handleLoginClick}>Log In / Admin</S.MenuItem>
          )}
        </S.SideMenu>
      )}
    </>
  );
}
