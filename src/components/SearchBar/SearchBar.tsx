import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface SearchBarProps {
  onSearch: (searchQuery: string) => Promise<void>;
}
const GRAY_COLOR = '#CCC';
const DARK_GRAY_COLOR = '#999';

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK_GRAY_COLOR,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    backgroundColor: GRAY_COLOR,
    borderColor: GRAY_COLOR,
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingLeft: 8,
  },
});

function SearchBar({ onSearch }: SearchBarProps): JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');

  const handleTextChange = (text: string): void => {
    setSearchQuery(text);
    void onSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text: string) => {
          handleTextChange(text);
        }}
        value={searchQuery}
        placeholder="Search for an artist"
        testID="search-input"
      />
    </View>
  );
}

export default SearchBar;
