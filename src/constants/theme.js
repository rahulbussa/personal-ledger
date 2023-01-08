import {Dimensions} from 'react-native';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperDefaultTheme,
} from 'react-native-paper';

export const themes = {
  light: {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      accent: '#bc4598',
    },
  },
  dark: {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      accent: '#bc4598',
    },
  },
};

const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#194868', // dark blue
  secondary: '#FF615F', //peach

  lime: '#00BA63',
  emerald: '#2BC978',

  black: '#1E1F20',
  white: '#FFFFFF',
  lightGrey: '#FCFBFC',
  lightGrey1: '#F5F7F9',
  grey: '#BEC1D2',
  blue: '#42B0FF',
  yellow: '#FFD573',
  lightBlue: '#95A9B8',
  darkGrey: '#C3C6C7',
  transparent: 'transparent',
  green: '#009E77',
  darkGreen: '#008159',
  red: '#FF0000',
};;

export const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: 'InterMedium',
    fontSize: SIZES.largeTitle,
    lineHeight: 36,
  },
  h1: {fontFamily: 'InterBold', fontSize: SIZES.h1, lineHeight: 36},
  h2: {fontFamily: 'InterBold', fontSize: SIZES.h2, lineHeight: 30},
  h3: {fontFamily: 'InterBold', fontSize: SIZES.h3, lineHeight: 22},
  h4: {fontFamily: 'InterBold', fontSize: SIZES.h4, lineHeight: 22},
  body1: {fontFamily: 'InterRegular', fontSize: SIZES.body1, lineHeight: 36},
  body2: {fontFamily: 'InterRegular', fontSize: SIZES.body2, lineHeight: 30},
  body3: {fontFamily: 'InterRegular', fontSize: SIZES.body3, lineHeight: 22},
  body4: {fontFamily: 'InterRegular', fontSize: SIZES.body4, lineHeight: 22},
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
