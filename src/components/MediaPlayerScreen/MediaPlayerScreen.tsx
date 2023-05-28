import React from 'react';
import { View } from 'react-native';
import SearchBar from '../SearchBar/SearchBar.tsx';
import SongList from '../SongList/SongList.tsx';
import AppStyles from '../../styles/AppStyles.ts';

/**
 * The MediaPlayerScreen component.
 *
 * @returns {JSX.Element} - The rendered MediaPlayerScreen component.
 */
function MediaPlayerScreen(): JSX.Element {
  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.mainContent}>
        <SearchBar />
        <SongList />
      </View>
    </View>
  );
}

export default MediaPlayerScreen;
