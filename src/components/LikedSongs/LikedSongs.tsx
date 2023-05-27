import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import type Song from '../../types/Song.ts';
import { getLikedSongs } from '../../services/songStorage';
import styles from './LikedSongs.styles.ts';
import { useFocusEffect } from '@react-navigation/native';

function LikedSongs(): JSX.Element {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);

  const loadLikedSongs = useCallback(async () => {
    const songs = await getLikedSongs();
    setLikedSongs(songs);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadLikedSongs();
    }, [loadLikedSongs])
  );

  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity style={styles.listItem}>
      <Image style={styles.image} source={{ uri: item.artworkUrl100 }} />
      <View style={styles.listItemText}>
        <Text style={styles.listItemTitle}>{item.trackName}</Text>
        <Text style={styles.listItemArtist}>{item.artistName}</Text>
        <Text style={styles.listItemAlbum}>{item.collectionName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liked Songs</Text>
      <FlatList
        data={likedSongs}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.trackId}-${index}`}
      />
    </View>
  );
}

export default LikedSongs;
