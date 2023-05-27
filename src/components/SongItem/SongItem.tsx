// SongItem.tsx
import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Keyboard,
} from 'react-native';
import { SongContext } from '../../contexts/SongContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './SongItem.styles.ts'; // Create appropriate styles
import Song from '../../types/Song';

interface SongItemProps {
  song: Song;
}

const SongItem: React.FC<SongItemProps> = ({ song }) => {
  const { state, dispatch } = useContext(SongContext);

  const handleSongPress = async (song: Song): Promise<void> => {
    Keyboard.dismiss();

    if (
      state.currentSong !== null &&
      state.currentSong.trackId === song.trackId
    ) {
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

  const handleLikePress = async (song: Song): Promise<void> => {
    const isLiked = state.likedSongs.has(song.trackId);
    let updatedLikedSongs: Map<string, Song> = new Map(state.likedSongs);

    if (isLiked) {
      updatedLikedSongs.delete(song.trackId);
      dispatch({ type: 'unlikeSong', payload: song });
    } else {
      updatedLikedSongs.set(song.trackId, song);
      dispatch({ type: 'likeSong', payload: song });
    }

    try {
      await AsyncStorage.setItem(
        '@liked_songs',
        JSON.stringify(Array.from(updatedLikedSongs.values()))
      );
    } catch (error) {
      console.error('Error saving liked songs:', error);
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

  const millisToMinutesAndSeconds = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <TouchableOpacity
      style={[
        styles.listItem,
        state.currentSong !== null &&
          state.currentSong.trackId === song.trackId &&
          styles.selectedItem,
      ]}
      onPress={() => {
        void handleSongPress(song);
      }}
      testID={`song-${song.trackId}`}
    >
      <Image style={styles.image} source={{ uri: song.artworkUrl100 }} />
      <View style={styles.listItemText}>
        <Text style={styles.listItemTitle}>{song.trackName}</Text>
        <Text style={styles.listItemArtist}>
          {song.artistName} -{' '}
          {millisToMinutesAndSeconds(song.trackTimeMillis ?? 0)}
        </Text>
        <Text style={styles.listItemAlbum}>{song.collectionName}</Text>
      </View>
      {state.currentSong !== null &&
        state.currentSong.trackId === song.trackId && (
          <View style={[styles.listItem, styles.speakerContainer]}>
            <Text style={styles.speakerIcon}>{getSpeakerIcon()}</Text>
          </View>
        )}
      <Button
        title={state.likedSongs.has(song.trackId) ? 'Unlike' : 'Like'}
        onPress={() => handleLikePress(song)}
      />
    </TouchableOpacity>
  );
};

export default SongItem;
