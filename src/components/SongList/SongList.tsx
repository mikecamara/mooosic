import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { SongContext } from '../../contexts/SongContext.tsx';
import type Song from '../../types/Song.ts';
import styles from './SongList.styles.ts';
import {
  fetchDefaultSongs,
  fetchSongs,
  useDefaultSongs,
  useSongs,
} from '../../services/ITunesApi';
import type ResponseData from '../../types/ResponseData.ts';

function SongList(): JSX.Element {
  const { state, dispatch } = useContext(SongContext);
  const { data, fetchNextPage, isFetching, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery<ResponseData, Error>(
      ['songs', state.searchQuery],
      ({ pageParam = 0 }) =>
        state.searchQuery
          ? fetchSongs(state.searchQuery)
          : fetchDefaultSongs(pageParam + 1),
      {
        getNextPageParam: (lastPage, allPages) => {
          // assuming each page has 25 songs
          return lastPage && allPages.length * 25 < lastPage.resultCount
            ? allPages.length + 1
            : false;
        },
      }
    );

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'setSongs',
        payload: data.pages.flatMap((page) => page.results),
      });
    }
  }, [data, dispatch]);

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

  const getSpeakerIcon = (): string => {
    if (state.isLoading) {
      return '⏳';
    }
    if (state.isPlaying) {
      return '🔊';
    }
    return '';
  };

  const millisToMinutesAndSeconds = (millis: number): string => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Number(((millis % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item }: { item: Song }): JSX.Element => (
    <TouchableOpacity
      style={[
        styles.listItem,
        state.currentSong !== null &&
          state.currentSong.trackId === item.trackId &&
          styles.selectedItem,
      ]}
      onPress={() => {
        void handleSongPress(item);
      }}
      testID={`song-${item.trackId}`}
    >
      <Image style={styles.image} source={{ uri: item.artworkUrl100 }} />
      <View style={styles.listItemText}>
        <Text style={styles.listItemTitle}>{item.trackName}</Text>
        <Text style={styles.listItemArtist}>
          {item.artistName} -{' '}
          {millisToMinutesAndSeconds(item.trackTimeMillis ?? 0)}
        </Text>
        <Text style={styles.listItemAlbum}>{item.collectionName}</Text>
      </View>
      {state.currentSong !== null &&
        state.currentSong.trackId === item.trackId && (
          <View style={[styles.listItem, styles.speakerContainer]}>
            {isFetching ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Text style={styles.speakerIcon}>{getSpeakerIcon()}</Text>
            )}
          </View>
        )}
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      // eslint-disable-next-line global-require
      source={require('../../../assets/background-mooosic.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.listContainer}>
          {isFetching && !data ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
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
          )}
        </View>
      </View>
    </ImageBackground>
  );
}

export default SongList;
