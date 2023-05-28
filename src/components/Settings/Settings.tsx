import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList.ts';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './Settings.styles.ts';

function Settings(): JSX.Element {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Settings'>>();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.darkMode]}>
      <View style={styles.switchContainer}>
        <Text style={[styles.label, isDark && styles.darkModeText]}>
          Dark Mode
        </Text>
        <Switch value={isDark} onValueChange={toggleTheme} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PrivacyPolicy')}
      >
        <Text style={styles.buttonText}>Privacy Policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ContactUs')}
      >
        <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Settings;
