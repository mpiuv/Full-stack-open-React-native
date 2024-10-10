import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      appBackGround: '#0d0c1d',
      white: '#FFFFFF',
      blue: '#0000FF',
      red: '#FF0000',
      error: '#db4b4b',
    },
    fontSizes: {
      body: 14,
      subheading: 16,
    },
    fonts: {
      main: Platform.select({
        android: 'Roboto',
        ios: 'Arial ',
        default: 'System',
    })},
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;