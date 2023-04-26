import { BlurView } from 'expo-blur';
import React, { useState, useEffect, useRef } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import {
  AppState,
  type AppStateStatus,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Animated } from 'react-native';
import type Song from '../../types/Song.ts';
import styles from './MediaPlayer.styles.ts';
import { truncateTitle } from './MediaPlayer.utils.ts';

interface MediaPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSoundObject: (soundObject: Audio.SoundObject | null) => void;
  handlePlayPause: () => Promise<void>;
}

/**
 * MediaPlayer component that handles audio playback, display
 * of song information, and user interactions.
 *
 * @param {MediaPlayerProps} {
 *   currentSong,
 *   isPlaying,
 *   setIsPlaying,
 *   setIsLoading,
 *   setSoundObject,
 *   handlePlayPause,
 * } - The MediaPlayer component properties.
 * @returns {JSX.Element | null} - The rendered MediaPlayer
 * component or null if the currentSong is null.
 */
function MediaPlayer({
  currentSong,
  isPlaying,
  setIsPlaying,
  setIsLoading,
  setSoundObject,
  handlePlayPause,
}: MediaPlayerProps): JSX.Element | null {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isMediaPlayerVisible, setIsMediaPlayerVisible] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (sound !== null) {
      const interval = setInterval(async () => {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.durationMillis > 0) {
          setProgress(status.positionMillis / status.durationMillis);
        } else {
          setProgress(0);
        }
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [sound]);

  useEffect(() => {
    const animationFunction = () => {
      Animated.spring(translateY, {
        toValue: isMediaPlayerVisible ? 0 : 100,
        useNativeDriver: true,
      }).start();
    };
    animationFunction();
  }, [isMediaPlayerVisible]);

  /**
   * Updates the MediaPlayer visibility state.
   *
   * @param {boolean} isVisible - The visibility state of the MediaPlayer.
   */
  const handleMediaPlayerVisibility = (isVisible: boolean) => {
    setIsMediaPlayerVisible(isVisible);
  };

  /**
   * Handles app state changes and adjusts audio playback accordingly.
   *
   * @param {AppStateStatus} nextAppState - The next app
   * state after a change occurs.
   * @returns {Promise<void>}
   */
  useEffect(() => {
    const handleAppStateChange = async (
      nextAppState: AppStateStatus
    ): Promise<void> => {
      if (nextAppState === 'background' && sound !== null) {
        const status = await sound.getStatusAsync();
        if ('isPlaying' in status && status.isPlaying) {
          setIsPlaying(false);
        }
      }
    };

    /**
     * Sets the audio mode for the app.
     *
     * @returns {Promise<void>}
     */
    const setAudioMode = async (): Promise<void> => {
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
        interruptionModeIOS: InterruptionModeIOS.MixWithOthers,
        interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
        shouldDuckAndroid: false,
      });
    };

    void setAudioMode();

    const appStateSubscription = AppState.addEventListener(
      'change',
      // eslint-disable-next-line no-void
      (nextAppState: AppStateStatus) => void handleAppStateChange(nextAppState)
    );

    return () => {
      appStateSubscription.remove();
      void sound?.unloadAsync();
    };
  }, [sound]);

  /**
   * Loads and plays the preview of the current song.
   *
   * @param {string} url - The URL of the song preview.
   * @param {() => void} onPreviewLoaded - A callback function
   * to be executed when the preview is loaded.
   * @returns {Promise<void>}
   */
  const loadAndPlayPreview = async (
    url: string,
    onPreviewLoaded: () => void
  ): Promise<void> => {
    handleMediaPlayerVisibility(true);
    if (url !== null && url !== '') {
      try {
        const { sound: newSound, status: newStatus } =
          await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true },
            (status) => {
              void (async () => {
                if (status.isLoaded && status.isPlaying) {
                  onPreviewLoaded();
                }

                if (status.isLoaded && status.didJustFinish) {
                  setIsPlaying(false);
                  await newSound.unloadAsync();
                  setSoundObject(null);
                }
              })();
            }
          );
        await newSound.playAsync();
        setSound(newSound);
        setSoundObject({ sound: newSound, status: newStatus });
      } catch (error) {
        console.error('Error while playing audio:', error);
      }
    }
  };

  useEffect(() => {
    if (isPlaying && currentSong !== null) {
      void loadAndPlayPreview(currentSong.previewUrl, () => {
        setIsLoading(false);
      });
    }
  }, [currentSong]);

  if (currentSong === null) {
    return null;
  }

  return (
    <Animated.View
      style={[styles.mediaPlayerWrapper, { transform: [{ translateY }] }]}
    >
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
        <BlurView intensity={30} style={styles.blurView} tint="light" />
        <View style={styles.content}>
          <View style={styles.songInfo}>
            {currentSong?.albumArt && (
              <Image
                source={{ uri: currentSong.albumArt }}
                style={styles.image}
              />
            )}
            <View>
              <Text style={styles.title}>
                {truncateTitle(currentSong?.title ?? 'No song selected')}
              </Text>
              <Text style={styles.artist}>
                {truncateTitle(currentSong?.artist ?? 'Unknown artist')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlayPause}
            testID="play-pause-button"
          >
            <Text style={styles.playButtonText}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

export default MediaPlayer;
