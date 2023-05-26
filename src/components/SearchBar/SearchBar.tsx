import React, { useState, useContext, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import styles from './SearchBar.styles.ts';
import { SongContext } from '../../contexts/SongContext.tsx';
import debounce from 'lodash.debounce';

function SearchBar(): JSX.Element {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch } = useContext(SongContext);

  const handleSearch = (): void => {
    dispatch({ type: 'setSearchQuery', payload: input.trim() });
  };

  useEffect(() => {
    dispatch({ type: 'setSearchQuery', payload: searchTerm.trim() });
  }, [searchTerm]);

  const debouncedHandleSearch = debounce(setSearchTerm, 300);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={(text) => {
          setInput(text);
          debouncedHandleSearch(text);
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
