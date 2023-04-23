import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import type Song from './types/Song.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';

async function fetchDefaultSongs(): Promise<Song[]> {
  const defaultQuery = 'farm+songs+and+other+animal+songs';
  const response = await fetch(
    `https://itunes.apple.com/search?term=${defaultQuery}&media=music&entity=song&limit=25`
  );

  if (!response.ok) {
    throw new Error('Error fetching data from iTunes API');
  }

  const data = await response.json();
  return data.results.map((result: any) => ({
    id: result.trackId.toString(),
    title: result.trackName,
    artist: result.artistName,
    album: result.collectionName,
    albumArt: result.artworkUrl100,
    playing: false,
    previewUrl: result.previewUrl,
  }));
}

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDefaultSongs = async (): Promise<void> => {
      const defaultSongs = await fetchDefaultSongs();
      setSongs(defaultSongs);
    };
    const loadData = async (): Promise<void> => {
      await loadDefaultSongs();
    };
    void loadData();
  }, []);

  const handleSearch = async (searchQuery: string): Promise<void> => {
    if (searchQuery.trim() === '') {
      const defaultSongs = await fetchDefaultSongs();
      setSongs(defaultSongs);
      return;
    }
    const response = await fetch(
      `https://itunes.apple.com/search?term=${searchQuery}&media=music&entity=song`
    );

    if (response.ok) {
      const data = await response.json();
      const fetchedSongs = data.results.map((result: any) => ({
        id: result.trackId.toString(),
        title: result.trackName,
        artist: result.artistName,
        album: result.collectionName,
        albumArt: result.artworkUrl100,
        playing: false,
        previewUrl: result.previewUrl,
      }));
      setSongs(fetchedSongs);
    } else {
      console.error('Error fetching data from iTunes API:', response);
    }
  };

  const handleSongPress = (song: Song, onLoadComplete: () => void): void => {
    if (currentSong !== null && currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
      onLoadComplete();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      onLoadComplete();
    }
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
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <MediaPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsLoading={setIsLoading}
        />
      </View>
    </View>
  );
}
