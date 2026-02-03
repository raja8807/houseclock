import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppNavigator from './src/navigation/AppNavigator';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Too aggressive for React Native usually
    },
  },
});

import { PropertyProvider } from './src/context/PropertyContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PropertyProvider>
          <AppNavigator />
        </PropertyProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
