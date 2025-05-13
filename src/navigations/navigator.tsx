import React from 'react';
import { useAuth } from '../app/auth-provider';
import { globalApplicationContext } from '../app/globalState';
import { AppContext } from '../app/app-context';
import { useBootstrapAuth } from '_hooks/useBootstrapAuth';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { AuthNavigator } from '_navigations/auth.navigator';
import AppNavigator from '_navigations/app.navigator';
import { View } from 'react-native';

export const Navigator = () => {
  const { bootstrapped } = useBootstrapAuth();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();

  if (!bootstrapped) {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size={'large'} color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <AppContext.Provider value={globalApplicationContext}>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </AppContext.Provider>
  );
};
