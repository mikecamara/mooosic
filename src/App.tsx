import React from 'react';
import { SongProvider } from './contexts/SongContext.tsx';
import LikedSongs from './components/LikedSongs/LikedSongs.tsx';
import Settings from './components/Settings/Settings.tsx';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MediaPlayerScreen from './components/MediaPlayerScreen/MediaPlayerScreen.tsx';

const Tab = createBottomTabNavigator();

/**
 * The main App component.
 *
 * @returns {JSX.Element} - The rendered App component.
 */
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Media Player"
          component={MediaPlayerScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Liked Songs" component={LikedSongs} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function WrappedApp(): JSX.Element {
  return (
    <SongProvider>
      <App />
    </SongProvider>
  );
}

export default WrappedApp;
