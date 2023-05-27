import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SongProvider } from './contexts/SongContext.tsx';
import MainNavigator from './MainNavigator';

function ProviderWrapper(): JSX.Element {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SongProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SongProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default ProviderWrapper;
