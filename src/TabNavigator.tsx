import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MediaPlayerScreen from './components/MediaPlayerScreen/MediaPlayerScreen.tsx';
import LikedSongs from './components/LikedSongs/LikedSongs.tsx';
import SettingsStack from './SettingsStack';
import { ThemeContext } from './contexts/ThemeContext';

const Tab = createBottomTabNavigator();

function TabNavigator(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: isDark ? '#333' : '#F5FCFF',
        },
        tabBarActiveTintColor: isDark ? '#fff' : '#000',
        tabBarInactiveTintColor: isDark ? '#888' : '#777',
      }}
    >
      <Tab.Screen
        name="Media Player"
        component={MediaPlayerScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes-outline" size={size} color={color} />
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
  );
}

export default TabNavigator;
