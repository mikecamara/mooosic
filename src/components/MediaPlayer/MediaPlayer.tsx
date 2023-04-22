import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type Song from '../../types/Song.ts';

const ORANGE_COLOR = '#ff6600';
const GRAY_COLOR = '#cccccc';
const LIGHT_GRAY_COLOR = '#e5e5e5';
const GREEN_COLOR = '#1DB954';
const styles = StyleSheet.create({
  artist: {
    color: ORANGE_COLOR,
  },
  container: {
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY_COLOR,
    borderColor: GRAY_COLOR,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    left: 0,
    opacity: 0.95,
    paddingHorizontal: 16,
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
  setCurrentSong: (song: Song | null) => void;
}

function MediaPlayer({
  currentSong,
  setCurrentSong,
}: MediaPlayerProps): JSX.Element | null {
  if (currentSong === null) {
    return null;
  }

  const handlePlayPause = (): void => {
    setCurrentSong(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.songInfo}>
        <Text style={styles.title}>{currentSong.title}</Text>
        <Text style={styles.artist}>{currentSong.artist}</Text>
      </View>
      <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
        <Text style={styles.playButtonText}>▶</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MediaPlayer;
