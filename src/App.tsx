import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import type Song from './types/Song.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';

async function fetchDefaultSongs(): Promise<Song[]> {
  const response = await fetch(
    'https://itunes.apple.com/us/rss/topsongs/limit=25/json'
  );

  if (!response.ok) {
    throw new Error('Error fetching data from iTunes API');
  }

  const data = await response.json();
  return data.feed.entry.map((entry: any) => ({
    id: entry.id.attributes['im:id'],
    title: entry['im:name'].label,
    artist: entry['im:artist'].label,
    album: '',
    albumArt: entry['im:image'][2].label,
    playing: false,
  }));
}

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

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
    console.log('Search query:', searchQuery);

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
      console.log('Fetched data:', data);
      const fetchedSongs = data.results.map((result: any) => ({
        id: result.trackId.toString(),
        title: result.trackName,
        artist: result.artistName,
        album: result.collectionName,
        albumArt: result.artworkUrl100,
        playing: false,
      }));
      setSongs(fetchedSongs);
    } else {
      console.error('Error fetching data from iTunes API:', response);
    }
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
