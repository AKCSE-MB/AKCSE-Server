import * as S from './page.styled';
import INSTAGRAM from '@/assets/common/sns/instagram.svg';
import { useRouter } from 'next/navigation';

export default function CFooter() {
  const router = useRouter();
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events' },
    //TODO: update path once resource page created
    { label: 'Resources', path: '/' },
    //TODO: add login check, once login feat implemented
    { label: 'Leaderboard', path: '/leaderboard' },
  ];

  return (
    <S.Container>
      <S.LinkContainer>
        {navLinks.map(({ label, path }) => (
          <S.LinkItem key={label} onClick={() => router.push(path)}>
            {label}
          </S.LinkItem>
        ))}
      </S.LinkContainer>
      <S.SnsContainer>
        <S.SnsItem
          onClick={() => {
            window.open('https://www.instagram.com/akcse.mb.yg/');
          }}
        >
          <INSTAGRAM />
        </S.SnsItem>
      </S.SnsContainer>
      <S.CopyrightText>© 2025 ACKSE. ALL RIGHTS RESERVED</S.CopyrightText>
    </S.Container>
  );
}
