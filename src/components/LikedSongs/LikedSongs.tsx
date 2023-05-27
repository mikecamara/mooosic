import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import type Song from '../../types/Song.ts';
import { getLikedSongs } from '../../services/songStorage';
import styles from './LikedSongs.styles.ts';
import { useFocusEffect } from '@react-navigation/native';
import SongItem from '../SongItem/SongItem.tsx';

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
    <SongItem song={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={likedSongs}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.trackId}-${index}`}
      />
    </View>
  );
}

export default LikedSongs;
