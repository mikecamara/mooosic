import React, { useState, useContext } from 'react';
import { TextInput, View } from 'react-native';
import styles from './SearchBar.styles.ts';
import { SongContext } from '../../contexts/SongContext.tsx';
import {
  fetchSongsFromAPI,
  fetchDefaultSongs,
} from '../../services/ITunesApi.ts';

function SearchBar(): JSX.Element {
  const [input, setInput] = useState('');
  const { state, dispatch } = useContext(SongContext);

  const handleSearch = async (): Promise<void> => {
    dispatch({ type: 'setSearchQuery', payload: input });
    try {
      if (input.trim() === '') {
        dispatch({ type: 'setSearchQuery', payload: '' });
        dispatch({ type: 'setCurrentPage', payload: 1 });
        const defaultSongs = await fetchDefaultSongs(1);
        dispatch({ type: 'setSongs', payload: defaultSongs });
        return;
      }

      dispatch({ type: 'setSongs', payload: [] });

      const fetchedSongs = await fetchSongsFromAPI(input);
      dispatch({ type: 'setSongs', payload: fetchedSongs });
    } catch (error) {
      console.error('Error occurred while searching:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
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
