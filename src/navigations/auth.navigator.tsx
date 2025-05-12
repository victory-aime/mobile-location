import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../modules/Login';
import { AuthStackParam } from '_types/navigations';
import { AuthRoute } from '_navigations/route/routes';

const AuthStack = createNativeStackNavigator<AuthStackParam>();

export const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen
          name={AuthRoute.LOGIN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};
