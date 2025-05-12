/**
 * @format
 */
import * as React from 'react';
import { AppRegistry, useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import { QueryClientProvider } from '@tanstack/react-query';
import { TYPES } from 'bvg-innovation-shared';
import { darkTheme, lightTheme } from '_theme/ThemeOverrides';
import { I18nProvider } from '_locales/i18nProvider';

export default function Main() {
  const theme = useColorScheme();
  return (
    <QueryClientProvider client={TYPES.queryClient}>
      <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <I18nProvider>
          <App />
        </I18nProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
