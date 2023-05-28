import React, { useContext, useEffect } from 'react';
import {
  View,
  FlatList,
  Keyboard,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { SongContext } from '../../contexts/SongContext.tsx';
import type Song from '../../types/Song.ts';
import styles from './SongList.styles.ts';
import SongItem from '../SongItem/SongItem.tsx';

import { fetchDefaultSongs, fetchSongs } from '../../services/ITunesApi';
import type ResponseData from '../../types/ResponseData.ts';
import { ThemeContext } from '../../contexts/ThemeContext';

function SongList(): JSX.Element {
  const { state, dispatch } = useContext(SongContext);
  const queryClient = useQueryClient();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<ResponseData, Error>(
      ['songs', state.searchQuery],
      ({ pageParam = 0 }) =>
        state.searchQuery.trim() !== ''
          ? fetchSongs(state.searchQuery)
          : fetchDefaultSongs(pageParam + 1),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.results.length === 25 ? allPages.length + 1 : false;
        },
      }
    );

  useEffect(() => {
    queryClient.invalidateQueries('songs');
  }, [state.searchQuery, queryClient]);

  const handleSongPress = async (song: Song): Promise<void> => {
    Keyboard.dismiss();

    if (
      state.currentSong !== null &&
      state.currentSong.trackId === song.trackId
    ) {
      dispatch({ type: 'setIsPlaying', payload: !state.isPlaying });
    } else {
      if (state.sound !== null) {
        void state.sound.pauseAsync();
        void state.sound.unloadAsync();
        dispatch({ type: 'setSoundObject', payload: null });
      }
      dispatch({ type: 'setCurrentSong', payload: song });
      dispatch({ type: 'setIsPlaying', payload: true });
    }
  };

  const renderItem = ({ item }: { item: Song }) => <SongItem song={item} />;

  return (
    <ImageBackground
      source={
        isDark
          ? require('../../../assets/background-dark.png')
          : require('../../../assets/background-light.png')
      }
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 55,
        height: '100%',
      }}
    >
      {isFetching && (
        <View style={[styles.centered, styles.absolute]}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

      <View style={styles.listContainer}>
        <FlatList
          data={data?.pages.flatMap((page) => page.results)}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.trackId}-${index}`}
          keyboardShouldPersistTaps="always"
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
        />
      </View>
    </ImageBackground>
  );
}

export default SongList;
