import * as S from './page.styled';

interface Props {
    active: boolean;
    clickEvent: () => void;
}

export default function CHamburgerIcon({ active, clickEvent }: Props) {
    return (
        <S.Container onClick={clickEvent}>
            <S.Bar $active={active}></S.Bar>
            <S.Bar $active={active}></S.Bar>
            <S.Bar $active={active}></S.Bar>
            <S.Bar $active={active}></S.Bar>
        </S.Container>
    );
}