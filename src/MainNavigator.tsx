// MainNavigator.tsx
import React from 'react';
import { View } from 'react-native';
import styles from './styles/AppStyles.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';
import TabNavigator from './TabNavigator';

function MainNavigator(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <TabNavigator />
      <MediaPlayer style={styles.mediaPlayer} />
    </View>
  );
}

export default MainNavigator;
