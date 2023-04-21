import React, { useState } from 'react';
import { Text, View } from 'react-native';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import type Song from './types/Song.ts';

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);

  const handleSearch = (searchQuery: string): void => {
    console.log('Search query:', searchQuery);
    setSongs([
      {
        id: '1',
        title: 'Song 1',
        artist: 'Artist 1',
      },
    ]);
  };

  const handleSongPress = (song: Song): void => {
    console.log('Selected song:', song);
    // Add your song selection logic here
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.text}>Hello World</Text>

      <View style={AppStyles.header}>
        <Text style={AppStyles.title}>Mooosic</Text>
      </View>
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} onSongPress={handleSongPress} />
    </View>
  );
}
