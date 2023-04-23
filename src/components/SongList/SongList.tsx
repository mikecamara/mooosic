import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
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
  onSongPress: (song: Song) => void;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

function SongList({
  songs,
  onSongPress,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
}: SongListProps): JSX.Element {
  const handleSongPress = (song: Song): void => {
    Keyboard.dismiss();
    if (currentSong !== null && currentSong.id === song.id) {
      if (isPlaying) {
        return;
      }
      setIsPlaying(true);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
    onSongPress(song);
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
          <Text style={styles.speakerIcon}>{isPlaying ? '🔊' : '🔇'}</Text>
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
