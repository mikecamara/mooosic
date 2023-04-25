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
  const translateY = useRef(new Animated.Value(100)).current;
  useEffect(() => {
    const animationFunction = () => {
      Animated.spring(translateY, {
        toValue: isMediaPlayerVisible ? 0 : 100,
        useNativeDriver: true,
      }).start();
    };
    animationFunction();
  }, [isMediaPlayerVisible]);

  const handleMediaPlayerVisibility = (isVisible: boolean) => {
    setIsMediaPlayerVisible(isVisible);
  };

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
        console.log('Playing audio');
        console.log(newSound);
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
      <View style={styles.mediaPlayerWrapper}>
        <View style={styles.container}>
          <BlurView intensity={50} style={styles.blurView} tint="light" />
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
              <Text style={styles.playButtonText}>
                {isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
}

export default MediaPlayer;
