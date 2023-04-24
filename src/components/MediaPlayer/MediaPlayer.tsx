import { BlurView } from 'expo-blur';
import React, { useState, useEffect } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import {
  AppState,
  type AppStateStatus,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
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
    console.log('Loading preview');
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
                  console.log('Playback has finished');
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
    } else {
      console.log('Cannot load an AV asset from a null playback source.');
      console.warn('Cannot load an AV asset from a null playback source.');
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
    <View style={styles.mediaPlayerWrapper}>
      <View style={styles.container}>
        <BlurView intensity={50} style={styles.blurView} tint="light" />
        <View style={styles.content}>
          <View style={styles.songInfo}>
            <Text style={styles.title}>
              {truncateTitle(currentSong?.title ?? 'No song selected')}
            </Text>
            <Text style={styles.artist}>
              {truncateTitle(currentSong?.artist ?? 'Unknown artist')}
            </Text>
          </View>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <Text style={styles.playButtonText}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MediaPlayer;
