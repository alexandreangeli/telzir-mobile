import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Home from '../pages/Home';
import {colors} from '../styleVariables';

const Stack = createStackNavigator();

const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.darkBlue,
  },
};

export default function Routes() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          component={Home}
          name="Home"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
