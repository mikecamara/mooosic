import { BlurView } from 'expo-blur';
import React, { useState, useEffect } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import {
  AppState,
  type AppStateStatus,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import type Song from '../../types/Song.ts';

const ORANGE_COLOR = '#ff6600';
const GRAY_COLOR = '#cccccc';
const LIGHT_GRAY_COLOR = '#e5e5e5';
const GREEN_COLOR = '#1DB954';
const styles = StyleSheet.create({
  artist: {
    color: ORANGE_COLOR,
  },
  blurView: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: -10,
  },
  container: {
    alignItems: 'center',
    borderColor: GRAY_COLOR,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    left: 0,
    paddingBottom: 30,
    paddingHorizontal: 16,
    position: 'absolute',
    right: 0,
  },
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  mediaPlayerWrapper: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  playButton: {
    alignItems: 'center',
    backgroundColor: GREEN_COLOR,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    width: 50,
  },
  playButtonText: {
    color: LIGHT_GRAY_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
  },
  songInfo: {
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
  },
});

interface MediaPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const truncateTitle = (title: string, maxLengthRatio = 0.09): string => {
  const screenWidth = Dimensions.get('window').width;
  const maxLength = Math.floor(screenWidth * maxLengthRatio);

  if (title.length <= maxLength) {
    return title;
  }

  let truncatedTitle = title.slice(0, maxLength);
  while (
    truncatedTitle.length > 0 &&
    (truncatedTitle.endsWith(' ') || truncatedTitle.endsWith(','))
  ) {
    truncatedTitle = truncatedTitle.slice(0, -1);
  }

  return `${truncatedTitle}...`;
};

function MediaPlayer({
  currentSong,
  isPlaying,
  setIsPlaying,
  setIsLoading,
}: MediaPlayerProps): JSX.Element | null {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [soundObject, setSoundObject] = useState<Audio.SoundObject | null>(
    null
  );
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

                // Update this block to handle the end of the song playback
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

  const handlePlayPause = (): void => {
    console.log('handlePlayPause');
    void (async () => {
      if (soundObject !== null) {
        console.log('soundObject is not null');
        const currentStatus = await soundObject.sound.getStatusAsync();
        if (currentStatus.isLoaded) {
          console.log('status is loaded');
          if (currentStatus.isPlaying) {
            console.log('status is playing');
            await soundObject.sound.pauseAsync();
            setIsPlaying(false);
          } else {
            console.log('status is not playing');
            await soundObject.sound.playAsync();
            setIsPlaying(true);
          }
        }
      } else {
        console.log('soundObject is null');
        if (currentSong !== null && !isPlaying) {
          setIsPlaying(true);
          void loadAndPlayPreview(currentSong.previewUrl, () => {
            setIsLoading(false);
          });
        }
      }
    })();
  };

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
