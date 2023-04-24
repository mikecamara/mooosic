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
  onSongPress: (song: Song, onLoadComplete: () => void) => void;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

function SongList({
  songs,
  onSongPress,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  isLoading,
  setIsLoading,
}: SongListProps): JSX.Element {
  const [loadingSongId, setLoadingSongId] = useState<string | null>(null);

  const handleSongPress = (song: Song): void => {
    Keyboard.dismiss();

    if (currentSong !== null && currentSong.id === song.id) {
      if (isPlaying) {
        console.log('Restarting song...');
        setIsPlaying(false);
        setTimeout(() => {
          onSongPress(song, () => {
            setLoadingSongId(null);
          });
        }, 100);
      } else {
        console.log('Starting song...');
        setIsPlaying(true);
        onSongPress(song, () => {
          setLoadingSongId(null);
        });
      }
    } else {
      console.log('Playing new song...');
      setCurrentSong(song);
      setIsPlaying(true);
      onSongPress(song, () => {
        setLoadingSongId(null);
      });
    }
  };

  const getSpeakerIcon = (): string => {
    if (isLoading) {
      return '⏳';
    }
    if (isPlaying) {
      return '🔊';
    }
    return '';
  };

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
    >
      <Image style={styles.image} source={{ uri: item.albumArt }} />
      <View style={styles.listItemText}>
        <Text style={styles.listItemTitle}>{item.title}</Text>
        <Text style={styles.listItemArtist}>{item.artist}</Text>
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
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
        />
      )}
    </View>
  );
}

export default SongList;
