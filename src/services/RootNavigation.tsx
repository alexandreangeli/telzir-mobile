import * as React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';
import {IResultParams} from '../pages/Result/types';

export type RootStackParamList = {
  Home: undefined;
  Result: IResultParams;
};

const RootNavigation = {
  navigationRef: React.createRef() as React.RefObject<NavigationContainerRef>,

  navigate<T extends object>(name: string, params?: T) {
    this.navigationRef.current?.navigate(name, params);
  },

  goBack() {
    this.navigationRef.current?.goBack();
  },

  getCurrentRoute() {
    return (this.navigationRef.current as any)?.getCurrentRoute()?.name;
  },
};

export default RootNavigation;
