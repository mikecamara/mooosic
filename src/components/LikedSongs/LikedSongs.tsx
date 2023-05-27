import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import type Song from '../../types/Song.ts';
import styles from './LikedSongs.styles.ts';
import SongItem from '../SongItem/SongItem.tsx';
import { SongContext } from '../../contexts/SongContext';

function LikedSongs(): JSX.Element {
  const {
    state: { likedSongs },
  } = useContext(SongContext);

  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <SongItem song={item} />
  );

  const likedSongsArray = Array.from(likedSongs.values()).reverse();

  return (
    <View style={styles.container}>
      <FlatList
        data={likedSongsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.trackId}-${index}`}
      />
    </View>
  );
}

export default LikedSongs;
