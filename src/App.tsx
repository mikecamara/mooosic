import React from 'react';
import { View } from 'react-native';
import { SongProvider } from './contexts/SongContext.tsx';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';

/**
 * The main App component.
 *
 * @returns {JSX.Element} - The rendered App component.
 */
function App(): JSX.Element {
  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.mainContent}>
        <SearchBar />
        <SongList />
        <MediaPlayer />
      </View>
    </View>
  );
}

function WrappedApp(): JSX.Element {
  return (
    <SongProvider>
      <App />
    </SongProvider>
  );
}

export default WrappedApp;
