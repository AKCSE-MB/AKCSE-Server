import { ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';
import * as S from './page.styled';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function TextInput(
  { label, disabled = false, ...rest }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <S.InputContainer>
      {label && <S.StyledLabel>{label}</S.StyledLabel>}

      <S.TextInput disabled={disabled} ref={ref} {...rest} />
    </S.InputContainer>
  );
}

export default forwardRef<HTMLInputElement, Props>(TextInput);
