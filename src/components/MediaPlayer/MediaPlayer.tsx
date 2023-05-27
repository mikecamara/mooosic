import { BlurView } from 'expo-blur';
import React, { useContext, useEffect, useRef } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Audio } from 'expo-av';
import styles from './MediaPlayer.styles.ts';
import { truncateTitle } from './MediaPlayer.utils.ts';
import { SongContext } from '../../contexts/SongContext.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MediaPlayerProps {
  style?: StyleProp<ViewStyle>;
}

function MediaPlayer({ style }: MediaPlayerProps): JSX.Element | null {
  const { state, dispatch } = useContext(SongContext);
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (state.soundObject?.sound !== null) {
      const updateProgress = async (): Promise<void> => {
        try {
          if (state.soundObject?.sound !== null) {
            const status = await state.soundObject?.sound.getStatusAsync();
            if (status !== undefined) {
              if ('isLoaded' in status && status.isLoaded) {
                const duration = status.durationMillis ?? 0;
                if (duration > 0) {
                  dispatch({
                    type: 'setProgress',
                    payload: status.positionMillis / duration,
                  });
                } else {
                  dispatch({ type: 'setProgress', payload: 0 });
                }
              } else {
                dispatch({ type: 'setProgress', payload: 0 });
              }
            } else {
              dispatch({ type: 'setProgress', payload: 0 });
            }
          } else {
            dispatch({ type: 'setProgress', payload: 0 });
          }
        } catch (error) {
          console.error('Error while updating progress:', error);
          dispatch({ type: 'setProgress', payload: 0 });
        }
      };

      interval = setInterval(() => {
        void updateProgress();
      }, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [state.soundObject, dispatch]);

  useEffect(() => {
    const animationFunction = (): void => {
      Animated.spring(translateY, {
        toValue: state.isMediaPlayerVisible ? 0 : 100,
        useNativeDriver: true,
      }).start();
    };
    animationFunction();
  }, [state.isMediaPlayerVisible, translateY]);

  const handlePlayPause = async (): Promise<void> => {
    if (state.isPlaying) {
      if (state.soundObject?.sound !== null) {
        await state.soundObject?.sound.pauseAsync();
        dispatch({ type: 'setIsPlaying', payload: false });
      }
    } else if (state.soundObject?.sound !== null) {
      await state.soundObject?.sound.playAsync();
      dispatch({ type: 'setIsPlaying', payload: true });
    }
  };

  const loadAndPlayPreview = async (
    url: string,
    onPreviewLoaded: () => void
  ): Promise<void> => {
    if (url !== null && url !== '') {
      try {
        if (state.sound !== null) {
          await state.sound.pauseAsync();
          await state.sound.unloadAsync();
          dispatch({ type: 'setSoundObject', payload: null });
        }

        const { sound: newSound, status: newStatus } =
          await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true },
            (status) => {
              if (status.isLoaded && status.isPlaying) {
                onPreviewLoaded();
              }

              if (status.isLoaded && status.didJustFinish) {
                dispatch({ type: 'setIsPlaying', payload: false });
                void newSound.unloadAsync();
                dispatch({ type: 'setSoundObject', payload: null });
              }
            }
          );

        await newSound.playAsync();
        dispatch({ type: 'setIsPlaying', payload: true });
        dispatch({
          type: 'setSoundObject',
          payload: { sound: newSound, status: newStatus },
        });
        dispatch({
          type: 'setCurrentSong',
          payload: state.currentSong,
          isMediaPlayerVisible: true,
        });
      } catch (error) {
        console.error('Error while playing audio:', error);
      }
    }
  };

  useEffect(() => {
    if (state.isPlaying && state.currentSong !== null) {
      const onPreviewLoaded = (): void => {
        dispatch({ type: 'setIsLoading', payload: false });
      };
      void loadAndPlayPreview(state.currentSong.previewUrl, onPreviewLoaded);
    }
  }, [state.currentSong]);

  if (state.currentSong === null) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.mediaPlayerWrapper,
        style,
        { transform: [{ translateY }] },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${state.progress * 100}%` }]}
          />
        </View>
        <BlurView intensity={30} style={styles.blurView} tint="light" />
        <View style={styles.content}>
          <View style={styles.songInfo}>
            {state.currentSong?.artworkUrl100 !== null && (
              <Image
                source={{ uri: state.currentSong.artworkUrl100 }}
                style={styles.image}
              />
            )}
            <View>
              <Text style={styles.title}>
                {truncateTitle(
                  state.currentSong?.trackName ?? 'No song selected'
                )}
              </Text>
              <Text style={styles.artist}>
                {truncateTitle(
                  state.currentSong?.artistName ?? 'Unknown artist'
                )}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              void handlePlayPause();
            }}
            testID="play-pause-button"
          >
            <Text style={styles.playButtonText}>
              {state.isPlaying ? '⏸️' : '▶️'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

export default MediaPlayer;
