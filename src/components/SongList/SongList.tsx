import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { SongContext } from '../../contexts/SongContext.tsx';
import type Song from '../../types/Song.ts';
import styles from './SongList.styles.ts';
import {
  fetchDefaultSongs,
  fetchSongs,
  loadMoreSongsService,
} from '../../services/ITunesApi.ts';

function SongList(): JSX.Element {
  const { state, dispatch } = useContext(SongContext);
  const [loadingSongId, setLoadingSongId] = useState<string | null>(null);

  useEffect(() => {
    const loadDefaultSongs = async (): Promise<void> => {
      try {
        const defaultSongs = await fetchDefaultSongs(state.currentPage);
        dispatch({ type: 'setSongs', payload: defaultSongs });
      } catch (error) {
        console.error('Error loading default songs:', error);
      }
    };
    void loadDefaultSongs();
  }, []);

  useEffect(() => {
    const fetchAndSetSongs = async (): Promise<void> => {
      try {
        const songs = await fetchSongs(state.searchQuery);
        dispatch({ type: 'setSongs', payload: songs });
      } catch (error) {
        console.error(error);
      }
    };

    if (state.searchQuery !== '') {
      void fetchAndSetSongs();
    }
  }, [state.searchQuery, dispatch]);

  const handleSongPress = async (song: Song): Promise<void> => {
    Keyboard.dismiss();

    if (state.currentSong !== null && state.currentSong.id === song.id) {
      dispatch({ type: 'setIsPlaying', payload: !state.isPlaying });
    } else {
      if (state.sound !== null) {
        void state.sound.pauseAsync();
        void state.sound.unloadAsync();
        dispatch({ type: 'setSoundObject', payload: null });
      }
      dispatch({ type: 'setCurrentSong', payload: song });
      dispatch({ type: 'setIsPlaying', payload: true });
    }
  };

  const getSpeakerIcon = (): string => {
    if (state.isLoading) {
      return '⏳';
    }
    if (state.isPlaying) {
      return '🔊';
    }
    return '';
  };
  const loadMoreSongs = async (currentPage: number): Promise<void> => {
    if (state.searchQuery.trim() === '') {
      // Fetch default songs with the next page number
      const nextPage = currentPage + 1;
      const defaultSongs = await fetchDefaultSongs(nextPage);
      dispatch({
        type: 'setSongs',
        payload: [...state.songs, ...defaultSongs],
      });
      dispatch({ type: 'setCurrentPage', payload: nextPage });
    } else {
      // Fetch more songs matching the search query
      const songsLength = state.songs.length;
      try {
        const fetchedSongs = await loadMoreSongsService(
          currentPage,
          state.searchQuery,
          songsLength
        );
        dispatch({
          type: 'setSongs',
          payload: [...state.songs, ...fetchedSongs],
        });
        dispatch({ type: 'setCurrentPage', payload: currentPage + 1 });
      } catch (error) {
        console.error('Error occurred while loading more songs:', error);
      }
    }
  };

  const millisToMinutesAndSeconds = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity
      style={[
        styles.listItem,
        state.currentSong !== null &&
          state.currentSong.id === item.id &&
          styles.selectedItem,
      ]}
      onPress={() => {
        void handleSongPress(item);
      }}
      testID={`song-${item.id}`}
    >
      <Image style={styles.image} source={{ uri: item.albumArt }} />
      <View style={styles.listItemText}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemArtist}>
          {item.artist} - {millisToMinutesAndSeconds(item.trackTimeMillis ?? 0)}
        </Text>
        <Text style={styles.listItemAlbum}>{item.album}</Text>
      </View>
      {state.currentSong !== null && state.currentSong.id === item.id && (
        <View style={[styles.listItem, styles.speakerContainer]}>
          {loadingSongId === item.id ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : (
            <Text style={styles.speakerIcon}>{getSpeakerIcon()}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('../../../assets/background-mooosic.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {state.songs.length === 0 ? (
            <View style={styles.centered}>
              <Text style={styles.noResults}>No results found.</Text>
            </View>
          ) : (
            <FlatList
              data={state.songs}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              keyboardShouldPersistTaps="always"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onEndReached={async () => {
                await loadMoreSongs(state.currentPage);
              }}
              onEndReachedThreshold={0.5}
            />
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

export default SongList;
