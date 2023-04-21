import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

interface Song {
  id: string;
  title: string;
  artist: string;
}

interface SongListProps {
  songs: Song[];
  onSongPress: (song: Song) => void;
}

const SongList: React.FC<SongListProps> = ({ songs, onSongPress }) => {
  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity onPress={() => onSongPress(item)}>
      <Text>{item.title} - {item.artist}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={songs}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default SongList;
