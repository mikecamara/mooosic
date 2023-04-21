import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import type Song from '../../types/Song.ts';

interface SongListProps {
  songs: Song[];
  onSongPress: (song: Song) => void;
}

function SongList({ songs, onSongPress }: SongListProps): JSX.Element {
  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity
      onPress={() => {
        onSongPress(item);
      }}
    >
      <Text>
        {item.title} - {item.artist}
      </Text>
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
