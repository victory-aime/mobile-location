import React, { Suspense } from 'react';
import { AuthProvider } from './src/app/auth-provider';
import { NetworkProvider } from './src/app/providers/NetworkProvider';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import { Navigator } from '_navigations/navigator';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <NetworkProvider>
            <AuthProvider>
              <Suspense fallback={<ActivityIndicator />}>
                <Navigator />
              </Suspense>
            </AuthProvider>
          </NetworkProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
