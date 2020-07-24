import React, {useEffect} from 'react';
import Routes from './src/routes';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {colors} from './src/styleVariables';

export default function App() {
  useEffect(() => {
    StatusBar.setBackgroundColor(colors.darkBlue);
    SplashScreen.hide();
  }, []);

  return <Routes />;
}
