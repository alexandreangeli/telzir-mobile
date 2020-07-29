import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../pages/Home';
import {colors} from '../styleVariables';
import Result from '../pages/Result';
import RootNavigation, {RootStackParamList} from './RootNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.darkBlue,
  },
};

export default function Router() {
  return (
    <NavigationContainer ref={RootNavigation.navigationRef} theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={Result}
          name="Result"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
