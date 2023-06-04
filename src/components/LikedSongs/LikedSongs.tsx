import React, { useContext } from 'react';
import { View, FlatList } from 'react-native';
import type Song from '../../types/Song.ts';
import styles from './LikedSongs.styles.ts';
import SongItem from '../SongItem/SongItem.tsx';
import { SongContext } from '../../contexts/SongContext';
import { ThemeContext } from '../../contexts/ThemeContext';

function LikedSongs(): JSX.Element {
  const {
    state: { likedSongs },
  } = useContext(SongContext);

  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <SongItem song={item} />
  );

  const likedSongsArray = Array.from(likedSongs.values()).reverse();

  return (
    <ColorTheme style={[{ backgroundColor: isDark ? '#333' : '#F5FCFF' }]}>
      <FlatList
        data={likedSongsArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.trackId}-${index}`}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </ColorTheme>
  );
}

export default LikedSongs;
