/**
 * @format
 */
import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { TYPES } from 'bvg-innovation-shared';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

export default function Main() {
  return (
    <QueryClientProvider client={TYPES.queryClient}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
