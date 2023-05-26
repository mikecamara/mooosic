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
import { useInfiniteQuery, useQueryClient } from 'react-query';
import { LinearGradient } from 'expo-linear-gradient';
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
  const queryClient = useQueryClient();

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
    <LinearGradient
      // Background Linear Gradient
      colors={['#192f6a', '#3b5998']}
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
    </LinearGradient>
  );
}

export default SongList;
