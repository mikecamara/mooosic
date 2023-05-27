import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './components/Settings/Settings.tsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import ContactUs from './components/ContactUs/ContactUs.tsx';

const Stack = createStackNavigator();

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

export default SettingsStack;
