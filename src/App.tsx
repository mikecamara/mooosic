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
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'; // adjust the path accordingly
import { createStackNavigator } from '@react-navigation/stack';
import ContactUs from './components/ContactUs/ContactUs.tsx';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

// Create a client
const queryClient = new QueryClient();

export type RootStackParamList = {
  Settings: undefined;
  PrivacyPolicy: undefined;
  ContactUs: undefined;
  'Media Player': undefined;
  'Liked Songs': undefined;
};

const Stack = createStackNavigator(); // Import this from '@react-navigation/stack'

function SettingsStack() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerTitle: 'Privacy Policy' }}
      />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
}

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
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons
                    name="musical-notes-outline"
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Liked Songs"
              component={LikedSongs}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="heart-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsStack}
              options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings-outline" size={size} color={color} />
                ),
              }}
            />
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
