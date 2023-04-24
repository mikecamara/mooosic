import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import styles from './SearchBar.styles.ts';

interface SearchBarProps {
  onSearch: (searchQuery: string) => Promise<void>;
}

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
