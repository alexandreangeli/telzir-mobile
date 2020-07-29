import React, {useEffect, useContext, useState} from 'react';
import Routes from './src/services/Router';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {colors} from './src/styleVariables';
import {LoadingContext} from './src/contexts/LoadingContext';
import MyLoading from './src/components/MyLoading';
import {setApiInterceptors} from './src/services/Api';

export default function App() {
  const [loadingContextValue, setLoadingContextValue] = useState(
    useContext(LoadingContext),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setApiInterceptors(setLoadingContextValue);
    StatusBar.setBackgroundColor(colors.darkBlue);
    StatusBar.setHidden(false);
    SplashScreen.hide();
    setMounted(true);
  }, []);

  return (
    <LoadingContext.Provider value={loadingContextValue}>
      <MyLoading show={loadingContextValue}></MyLoading>
      {mounted ? <Routes /> : null}
    </LoadingContext.Provider>
  );
}
