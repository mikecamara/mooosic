// MainNavigator.tsx
import React, { useContext } from 'react';
import { View } from 'react-native';
import styles from './styles/AppStyles.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';
import TabNavigator from './TabNavigator';
import { ThemeContext } from './contexts/ThemeContext';

function MainNavigator(): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#333' : '#F5FCFF' }}>
      <TabNavigator />
      <MediaPlayer style={styles.mediaPlayer} />
    </View>
  );
}

export default MainNavigator;
