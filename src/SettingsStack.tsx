import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from './components/Settings/Settings.tsx';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import ContactUs from './components/ContactUs/ContactUs.tsx';
import { ThemeContext } from './contexts/ThemeContext.tsx';

const Stack = createStackNavigator();

function SettingsStack() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#333' : '#F5FCFF',
        },
        headerTintColor: isDark ? '#fff' : '#000',
      }}
    >
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
