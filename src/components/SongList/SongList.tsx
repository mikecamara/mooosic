import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import type Song from '../../types/Song.ts';
import styles from './SongList.styles.ts';

interface SongListProps {
  songs: Song[];
  onSongPress: (song: Song, onLoadComplete: () => void) => Promise<void>;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isLoading: boolean;
  loadMoreSongs: () => Promise<void>;
}

function SongList({
  songs,
  onSongPress,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  isLoading,
  loadMoreSongs,
}: SongListProps): JSX.Element {
  const [loadingSongId, setLoadingSongId] = useState<string | null>(null);
  /**
   * Handles the song press event and updates the relevant states.
   *
   * @param {Song} song - The song object that was pressed.
   */
  const handleSongPress = (song: Song): void => {
    Keyboard.dismiss();

    if (currentSong !== null && currentSong.id === song.id) {
      if (isPlaying) {
        setIsPlaying(false);
        setTimeout(() => {
          onSongPress(song, () => {
            setLoadingSongId(null);
          });
        }, 100);
      } else {
        setIsPlaying(true);
        onSongPress(song, () => {
          setLoadingSongId(null);
        });
      }
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      onSongPress(song, () => {
        setLoadingSongId(null);
      });
    }
  };

  /**
   * Returns the appropriate speaker icon based on
   * the loading and playing states.
   *
   * @returns {string} - The speaker icon as a string.
   */
  const getSpeakerIcon = (): string => {
    if (isLoading) {
      return '⏳';
    }
    if (isPlaying) {
      return '🔊';
    }
    return '';
  };

  /**
   * Converts the provided milliseconds to a minutes and seconds format.
   *
   * @param {number} millis - The duration in milliseconds.
   * @returns {string} - The formatted duration string
   * in "minutes:seconds" format.
   */
  const millisToMinutesAndSeconds = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  /**
   * Renders an individual item within the FlatList.
   *
   * @param {{ item: Song }} { item } - The song object to be rendered.
   * @returns {JSX.Element} - The rendered list item component.
   */
  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity
      style={[
        styles.listItem,
        currentSong !== null &&
          currentSong.id === item.id &&
          styles.selectedItem,
      ]}
      onPress={() => {
        handleSongPress(item);
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
      {currentSong !== null && currentSong.id === item.id && (
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
    <View style={styles.container}>
      {songs.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.noResults}>No results found.</Text>
        </View>
      ) : (
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          keyboardShouldPersistTaps="always"
          onEndReached={async () => {
            if (!isLoading) {
              await loadMoreSongs();
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

export default SongList;
