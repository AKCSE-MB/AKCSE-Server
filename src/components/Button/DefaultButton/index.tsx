import { ButtonHTMLAttributes, ReactNode } from 'react';
import * as S from './page.styled';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function DefaultButton({ children, ...rest }: Props) {
  return <S.Button {...rest}>{children}</S.Button>;
}
