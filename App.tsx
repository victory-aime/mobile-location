import React from 'react';
import {Dashboard} from './src/modules/dashboard/screens/Dashboard';
import {AppContext} from './src/app/app-context';
import {globalApplicationContext} from './src/app/globalState';
import {QueryClientProvider} from '@tanstack/react-query';
import {TYPES} from 'bvg-innovation-shared';

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={TYPES.queryClient}>
      <AppContext.Provider value={globalApplicationContext}>
        <Dashboard />
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
