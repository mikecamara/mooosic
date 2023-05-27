import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Settings: undefined;
  PrivacyPolicy: undefined;
  ContactUs: undefined;
};

function Settings(): JSX.Element {
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, 'Settings'>>();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Settings screen.</Text>
      <Button
        title="Go to Privacy Policy"
        onPress={() => navigation.navigate('PrivacyPolicy')}
      />
      <Button
        title="Contact Us"
        onPress={() => navigation.navigate('ContactUs')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Settings;
