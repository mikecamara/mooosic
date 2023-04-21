import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './components/SearchBar/SearchBar';
import SongList from './components/SongList/SongList';
import { AppStyles } from './styles/AppStyles';


export default function App() {
  const [songs, setSongs] = useState([]);

  const handleSearch = (searchQuery: string) => {
    console.log('Search query:', searchQuery);
    // Add your search logic here and update the `songs` state with the results
  };

  const handleSongPress = (song: Song) => {
    console.log('Selected song:', song);
    // Add your song selection logic here
  };

  return (
    <View style={AppStyles.container}>
      <StatusBar style="auto" />
      <View style={AppStyles.header}>
        <Text style={AppStyles.title}>Mooosic</Text>
      </View>
      <SearchBar onSearch={handleSearch} />
      <SongList songs={songs} onSongPress={handleSongPress} />
    </View>
  );
}
