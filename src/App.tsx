import React, { useState } from 'react';
import { View } from 'react-native';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import type Song from './types/Song.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';
import songsData from './data/songs.json';

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>(songsData);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const handleSearch = (searchQuery: string): void => {
    console.log('Search query:', searchQuery);

    if (searchQuery.trim() === '') {
      setSongs(songsData);
      return;
    }

    const filteredSongs = songsData.filter(
      (song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSongs(filteredSongs);
  };

  const handleSongPress = (song: Song): void => {
    console.log('Selected song:', song);
    setCurrentSong(song);
  };

  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.mainContent}>
        <SearchBar onSearch={handleSearch} />
        <SongList
          songs={songs}
          onSongPress={handleSongPress}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
        <MediaPlayer
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </View>
    </View>
  );
}
