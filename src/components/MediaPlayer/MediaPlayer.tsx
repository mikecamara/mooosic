import { BlurView } from 'expo-blur';
import React from 'react';
import {
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
    top: -10, // Move the blurView up by 10 units
  },
  container: {
    alignItems: 'center',
    borderColor: GRAY_COLOR,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    height: 70, // Increase the height to 70
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
}: MediaPlayerProps): JSX.Element | null {
  if (currentSong === null) {
    return null;
  }

  const handlePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.mediaPlayerWrapper}>
      <View style={styles.container}>
        <BlurView
          intensity={50}
          style={styles.blurView}
          tint="light" // Add this line
        />
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
