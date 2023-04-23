import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import type Song from '../../types/Song.ts';

const GRAY_COLOR = '#e1e1e1';

const styles = StyleSheet.create({
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
  },
  listItem: {
    alignItems: 'center',
    borderBottomColor: GRAY_COLOR,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  listItemAlbum: {
    fontSize: 12,
  },
  listItemArtist: {
    fontSize: 14,
  },
  listItemText: {
    flex: 1,
    marginLeft: 10,
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noResults: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  selectedItem: {
    backgroundColor: GRAY_COLOR,
  },
  speakerContainer: {
    borderBottomWidth: 0,
  },
  speakerIcon: {
    fontSize: 20,
    marginLeft: 10,
  },
});

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
    const playSong: () => Promise<void> = async () => {
      setLoadingSongId(song.id);
      setIsLoading(true);
      onSongPress(song, () => {
        setLoadingSongId(null);
      });
    };
    if (currentSong !== null && currentSong.id === song.id) {
      if (!isPlaying) {
        setIsPlaying(true);
      }
      void playSong();
      // Restart the song
      setIsPlaying(false);
      setTimeout(() => {
        setIsPlaying(true);
      }, 0);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      void playSong();
    }
  };

  const getSpeakerIcon = (): string => {
    if (isLoading) {
      return '⏳';
    }
    if (isPlaying) {
      return '🔊';
    }
    return '🔇';
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
