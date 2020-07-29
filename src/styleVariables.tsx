import {StyleProp, ViewStyle} from 'react-native';

export const colors = {
  white: 'white',
  darkBlue: '#090e21',
  mediumBlue: 'rgb(17,19,40)',
  lightBlue: '#1d1d35',
  lightRed: '#eb1555',
  lightGreen: '#48b37d',
};

export const blueSquareStyle: StyleProp<ViewStyle> = {
  maxHeight: '100%',
  maxWidth: '100%',
  height: '100%',
  width: '100%',
  backgroundColor: colors.mediumBlue,
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: 20,
};
