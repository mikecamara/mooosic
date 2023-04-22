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

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
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
});

interface SongListProps {
  songs: Song[];
  onSongPress: (song: Song) => void;
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
}

function SongList({
  songs,
  onSongPress,
  currentSong,
  setCurrentSong,
}: SongListProps): JSX.Element {
  const handleSongPress = (song: Song): void => {
    if (currentSong !== null && currentSong.id === song.id) {
      setCurrentSong(null);
    } else {
      setCurrentSong(song);
    }
    onSongPress(song);
  };

  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity
      style={styles.listItem}
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
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default SongList;
