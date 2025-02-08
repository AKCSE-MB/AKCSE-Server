import * as S from './page.styled';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useUser from '@/hooks/useUser';
import useKakaoLogin from '@/hooks/useKakaoLogin';
import CHamburgerIcon from '@/components/c-hamburger-icon';

interface Props {
  title: string;
  subTitle?: string;
  BackBtn?: boolean;
}

export default function Header({ title, subTitle, BackBtn }: Props) {
  const { back, push } = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { isLoggedIn, logout } = useUser();
  const { loginHandler } = useKakaoLogin();
  const [active, setAcitve] = useState(true);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleHomeClick = () => {
    // toggleMenu();
    push('/');
  };

  const handleEventsClick = () => {
    // toggleMenu();
    push('/events');
  };

  const handleResourcesClick = () => {
    // toggleMenu();
    push('/');
  };

  const handleLeaderboardClick = () => {
    // toggleMenu();
    push('/leaderboard');
  };

  const handleLoginClick = () => {
    // toggleMenu();
    loginHandler();
  };

  const handleLogoutClick = () => {
    // toggleMenu();
    logout();
  };

  return (
    <>
      <S.HeaderWrapper>
        <S.TitleContainer>
          <S.Title>{title}</S.Title>

          {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
        </S.TitleContainer>
        <CHamburgerIcon active={isMenuOpen} clickEvent={toggleMenu} />
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
              <S.MenuItem onClick={handleLogoutClick}>Log Out</S.MenuItem>
            </div>
          ) : (
            <div>
              <S.MenuItem onClick={handleLoginClick}>Log In / Admin</S.MenuItem>
            </div>
          )}
        </S.SideMenu>
      )}
    </>
  );
}
