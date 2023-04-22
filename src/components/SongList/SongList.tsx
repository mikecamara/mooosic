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
}

function SongList({ songs, onSongPress }: SongListProps): JSX.Element {
  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        onSongPress(item);
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
