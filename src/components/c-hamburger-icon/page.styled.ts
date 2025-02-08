import styled, { css } from 'styled-components';

export const Container = styled.div`
    width: 17px;
    height: 17px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    float: right;
    z-index: 9990;
    position: absolute;
    top: 30px;
    right: 20px;
    overflow: hidden;
`;

const barSettings = ($active: boolean) => css`
    ${$active &&
    css`
        &:nth-child(1),
        &:nth-child(4) {
            opacity: 0;
        }
        &:nth-child(2) {
            transform: rotate(45deg);
            top: 6px;
        }
        &:nth-child(3) {
            transform: rotate(-45deg);
            top: 6px;
        }
    `}

    ${!$active &&
    css`
        &:nth-child(1) {
            top: 0;
        }
        &:nth-child(2),
        &:nth-child(3) {
            top: 6px;
            width: 80%;
            transform: translateX(20%);
        }
        &:nth-child(4) {
            top: 12px;
        }
    `}
`;

export const Bar = styled.span<{ $active: boolean }>`
    position: absolute;
    height: 2.5px;
    border-radius: 2.5px;
    width: 100%;
    background-color: #111111;
    top: 0;
    
    transition: 0.2s;
    ${({ $active }) => barSettings($active)}
`;