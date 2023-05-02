import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { type Audio } from 'expo-av';
import SearchBar from './components/SearchBar/SearchBar.tsx';
import SongList from './components/SongList/SongList.tsx';
import AppStyles from './styles/AppStyles.ts';
import type Song from './types/Song.ts';
import MediaPlayer from './components/MediaPlayer/MediaPlayer.tsx';
/**
 * Parses a raw song object returned from the iTunes API into a Song type.
 *
 * @param {any} result - The raw song object.
 * @returns {Song} - The parsed song object.
 */
function parseSong(result: any): Song {
  return {
    id: result.trackId.toString(),
    title: result.trackName,
    artist: result.artistName,
    album: result.collectionName,
    albumArt: result.artworkUrl100,
    playing: false,
    previewUrl: result.previewUrl,
    trackTimeMillis: result.trackTimeMillis,
  };
}

/**
 * Fetches a list of songs from the iTunes API with the given page number.
 *
 * @param {number} page - The page number for the API request.
 * @returns {Promise<Song[]>} - A promise resolving to an array of songs.
 */
async function fetchDefaultSongs(page: number): Promise<Song[]> {
  const defaultQuery = 'red+hot';

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${defaultQuery}&media=music&entity=song&limit=25&offset=${
        (page - 1) * 25
      }`
    );

    if (!response.ok) {
      throw new Error('Error fetching data from iTunes API');
    }

    const data = await response.json();
    return data.results.map(parseSong);
  } catch (error) {
    console.error('Error fetching data from iTunes API:', error);
    throw error;
  }
}

/**
 * The main App component.
 *
 * @returns {JSX.Element} - The rendered App component.
 */
export default function App(): JSX.Element {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [soundObject, setSoundObject] = useState<Audio.SoundObject | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadDefaultSongs = async (): Promise<void> => {
      try {
        const defaultSongs = await fetchDefaultSongs(currentPage);
        setSongs(defaultSongs);
      } catch (error) {
        console.error('Error loading default songs:', error);
      }
    };
    void loadDefaultSongs();
  }, []);

  /**
   * Handles the search functionality.
   *
   * @param {string} searchQuery - The search query.
   * @returns {Promise<void>}
   */
  const handleSearch = async (newSearchQuery: string): Promise<void> => {
    setSearchQuery(newSearchQuery);
    try {
      if (newSearchQuery.trim() === '') {
        setSearchQuery('');
        setCurrentPage(1);
        const defaultSongs = await fetchDefaultSongs(1);
        setSongs(defaultSongs);
        return;
      }

      setSongs([]);

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          newSearchQuery
        )}&media=music&entity=song&attribute=artistTerm&limit=25`
      );

      if (response.ok) {
        const data = await response.json();
        const fetchedSongs = data.results.map(parseSong);
        setSongs(fetchedSongs);
      } else {
        throw new Error(
          `Error fetching data from iTunes API: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  /**
   * Handles the play and pause functionality.
   *
   * @returns {Promise<void>}
   */
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
    }
  };

  /**
   * Restarts the current song.
   *
   * @returns {Promise<void>}
   */

  const restartSong = async (): Promise<void> => {
    if (soundObject !== null) {
      setIsPlaying(false);
      await soundObject.sound.setPositionAsync(0);
      setIsPlaying(true);
    }
  };

  /**
   * Handles the song selection and updates the state accordingly.
   *
   * @param {Song} song - The selected song.
   * @param {() => void} onLoadComplete - A callback function to be executed
   * when the song is loaded.
   * @returns {void}
   */
  const handleSongPress = async (
    song: Song,
    onLoadComplete: () => void
  ): Promise<void> => {
    if (currentSong !== null && currentSong.id === song.id) {
      await restartSong();
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      onLoadComplete();
    }
  };

  /**
   * Loads more songs from the API and appends them to the current list.
   *
   * @returns {Promise<void>}
   */

  const loadMoreSongs = async (): Promise<void> => {
    try {
      if (searchQuery.trim() === '') {
        setCurrentPage((prevPage) => prevPage + 1);
        const defaultSongs = await fetchDefaultSongs(currentPage + 1);
        setSongs((prevSongs) => [...prevSongs, ...defaultSongs]);
        return;
      }

      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchQuery
        )}&media=music&entity=song&attribute=artistTerm&limit=25&offset=${
          songs.length
        }`
      );

      if (response.ok) {
        const data = await response.json();
        const fetchedSongs = data.results.map(parseSong);

        if (fetchedSongs.length > 0) {
          setSongs((prevSongs) => [...prevSongs, ...fetchedSongs]);
        } else {
          console.log('No more songs to load');
        }
      } else {
        throw new Error(
          `Error fetching data from iTunes API: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error('Error occurred while loading more songs:', error);
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
          loadMoreSongs={async () => {
            await loadMoreSongs();
          }}
        />
        <MediaPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setIsLoading={setIsLoading}
          setSoundObject={setSoundObject}
          handlePlayPause={handlePlayPause}
        />
      </View>
    </View>
  );
}
