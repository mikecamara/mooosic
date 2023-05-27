import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SongProvider } from './contexts/SongContext.tsx';
import LikedSongs from './components/LikedSongs/LikedSongs.tsx';
import Settings from './components/Settings/Settings.tsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MediaPlayerScreen from './components/MediaPlayerScreen/MediaPlayerScreen.tsx';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';
import { View } from 'react-native';
import styles from './styles/AppStyles.ts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

// Create a client
const queryClient = new QueryClient();

/**
 * The main App component.
 *
 * @returns {JSX.Element} - The rendered App component.
 */
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <Tab.Navigator>
            <Tab.Screen
              name="Media Player"
              component={MediaPlayerScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Liked Songs" component={LikedSongs} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
          <MediaPlayer style={styles.mediaPlayer} />
        </View>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

function WrappedApp(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SongProvider>
        <App />
      </SongProvider>
    </SafeAreaProvider>
  );
}

export default WrappedApp;
