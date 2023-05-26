import React, { useState, useContext } from 'react';
import { ActivityIndicator, TextInput, View } from 'react-native';
import styles from './SearchBar.styles.ts';
import { SongContext } from '../../contexts/SongContext.tsx';
import {
  fetchSongsFromAPI,
  fetchDefaultSongs,
} from '../../services/ITunesApi.ts';
import debounce from 'lodash.debounce';

function SearchBar(): JSX.Element {
  const [input, setInput] = useState('');
  const { dispatch } = useContext(SongContext);

  const handleSearch = (): void => {
    dispatch({ type: 'setSearchQuery', payload: input.trim() });
  };

  const debouncedHandleSearch = debounce(handleSearch, 500); // 500 ms delay

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text) => {
          setInput(text);
          debouncedHandleSearch();
        }}
        onSubmitEditing={() => {
          void handleSearch();
        }}
        placeholder="Search artist"
        placeholderTextColor="white"
      />
    </View>
  );
}

export default SearchBar;
