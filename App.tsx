import React, { Suspense } from 'react';
import { AuthProvider } from './src/app/auth-provider';
import AppNavigator from '_navigations/app.navigator';
import { NetworkProvider } from './src/app/providers/NetworkProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <NetworkProvider>
            <AuthProvider>
              <Suspense fallback={<ActivityIndicator />}>
                <AppNavigator />
              </Suspense>
            </AuthProvider>
          </NetworkProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
