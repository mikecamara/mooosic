import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import type Song from '../../types/Song.ts';

// add color #ccc'
const GRAY_COLOR = '#e1e1e1';

const styles = StyleSheet.create({
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
    marginTop: 20,
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
    if (currentSong !== null && currentSong.id === song.id) {
      // If the song is already playing, do nothing
      if (isPlaying) {
        return;
      }
      // Otherwise, set the state to play the same song from the beginning
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
    <View>
      {songs.length === 0 ? (
        <Text style={styles.noResults}>No results found.</Text>
      ) : (
        <FlatList
          data={songs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

export default SongList;
