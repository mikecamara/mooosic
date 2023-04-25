import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import type Song from './types/Song.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';

async function fetchDefaultSongs(page: number): Promise<Song[]> {
  const defaultQuery = 'red+hot';
  const response = await fetch(
    `https://itunes.apple.com/search?term=${defaultQuery}&media=music&entity=song&limit=25&offset=${
      (page - 1) * 25
    }`
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
    trackTimeMillis: result.trackTimeMillis,
  }));
}

export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [soundObject, setSoundObject] = useState<Audio.SoundObject | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const handlePlayPause = async (): Promise<void> => {
    if (soundObject !== null) {
      const currentStatus = await soundObject.sound.getStatusAsync();
      if (currentStatus.isLoaded) {
        if (currentStatus.isPlaying) {
          await soundObject.sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await soundObject.sound.playAsync();
          setIsPlaying(true);
        }
      }
    } else if (currentSong !== null && !isPlaying) {
      setIsPlaying(true);
      onSongPress(currentSong, () => {
        setIsLoading(false);
      });
    }
  };

  const handleSongPress = (song: Song, onLoadComplete: () => void): void => {
    if (currentSong !== null && currentSong.id === song.id) {
      restartSong();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      onLoadComplete();
    }
  };

  const restartSong = async (): Promise<void> => {
    if (soundObject !== null) {
      setIsPlaying(false);
      await soundObject.sound.setPositionAsync(0);
      setIsPlaying(true);
    }
  };

  const loadMoreSongs = async (): Promise<void> => {
    setCurrentPage(currentPage + 1);
    const newSongs = await fetchDefaultSongs(currentPage + 1);
    setSongs([...songs, ...newSongs]);
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
          loadMoreSongs={loadMoreSongs}
        />
        <MediaPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsLoading={setIsLoading}
          onSongPress={handleSongPress}
          restartSong={restartSong}
          soundObject={soundObject}
          setSoundObject={setSoundObject}
          handlePlayPause={handlePlayPause}
        />
      </View>
    </View>
  );
}
