import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../modules/Login';
import { useAuth } from '../app/auth-provider';
import { globalApplicationContext } from '../app/globalState';
import { AppContext } from '../app/app-context';
import { useBootstrapAuth } from '_hooks/useBootstrapAuth';
import { ActivityIndicator } from 'react-native-paper';
import BottomTabNavigator from '_navigations/bottom-tab.navigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { bootstrapped } = useBootstrapAuth();
  const { isAuthenticated } = useAuth();

  if (!bootstrapped) {
    return <ActivityIndicator size={'large'} color={'red'} />;
  }

  return (
    <AppContext.Provider value={globalApplicationContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <Stack.Screen name="Tabs" component={BottomTabNavigator} />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};
export default AppNavigator;
