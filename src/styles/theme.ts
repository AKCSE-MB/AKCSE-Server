import { DefaultTheme } from 'styled-components';

const colors = {
  white: '#ffffff',
  black: '#000000',
  primary: {
    y90: '#FF7002',
    brown: '#662E0B',
    dark_brown: '#222524',
  },
  secondary: {
    o90: '#C13001',
  },
  neutral: {
    bg90: '#253238',
    bg80: '#37474F',
  },
  simentic: {
    dg90: '#207B00',
    dg50: '#3FC500',
    r90: '#CB2528',
    r60: '#E53835',
    black: '#000000',
    white: '#FFFFFF',
  },
};

export const theme: DefaultTheme = {
  colors,
  textColor: colors.neutral.bg80,
};

export type Theme = typeof theme;

export type Color = typeof colors;
