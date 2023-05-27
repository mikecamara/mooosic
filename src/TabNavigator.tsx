import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MediaPlayerScreen from './components/MediaPlayerScreen/MediaPlayerScreen.tsx';
import LikedSongs from './components/LikedSongs/LikedSongs.tsx';
import SettingsStack from './SettingsStack';

const Tab = createBottomTabNavigator();

function TabNavigator(): JSX.Element {
  return (
    <Tab.Navigator>
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
