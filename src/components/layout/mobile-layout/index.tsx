import * as S from './page.styled';
interface Props {
  children: React.ReactNode;
}

export default function MobileLayout({ children }: Props) {
  return (
    <S.LayoutWrapper>
      <S.Layout>
        <S.LogoWrapper></S.LogoWrapper>
        {children}
      </S.Layout>
    </S.LayoutWrapper>
  );
}
