import React, { useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList.ts';
import { ThemeContext } from '../../contexts/ThemeContext';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  darkMode: {
    backgroundColor: '#333',
  },
  darkModeText: {
    color: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0080ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Settings;
