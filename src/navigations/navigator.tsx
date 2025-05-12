import React from 'react';
import { useAuth } from '../app/auth-provider';
import { globalApplicationContext } from '../app/globalState';
import { AppContext } from '../app/app-context';
import { useBootstrapAuth } from '_hooks/useBootstrapAuth';
import { ActivityIndicator } from 'react-native-paper';
import { AuthNavigator } from '_navigations/auth.navigator.tsx';
import AppNavigator from '_navigations/app.navigator.tsx';

export const Navigator = () => {
  const { bootstrapped } = useBootstrapAuth();
  const { isAuthenticated } = useAuth();

  if (!bootstrapped) {
    return <ActivityIndicator size={'large'} color={'red'} />;
  }

  return (
    <AppContext.Provider value={globalApplicationContext}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </AppContext.Provider>
  );
};
