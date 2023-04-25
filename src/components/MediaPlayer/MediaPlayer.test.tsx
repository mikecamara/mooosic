import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MediaPlayer from './MediaPlayer.tsx';

jest.mock('expo-av', () => {
  const InterruptionModeIOS = {
    MixWithOthers: 'InterruptionModeIOS.MixWithOthers',
  };
  const InterruptionModeAndroid = {
    DuckOthers: 'InterruptionModeAndroid.DuckOthers',
  };
  const Audio = {
    setAudioModeAsync: jest.fn(),
    // Add any other methods or properties you are using from expo-av
  };
  return { Audio, InterruptionModeIOS, InterruptionModeAndroid };
});

jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

describe('MediaPlayer', () => {
  const song = {
    id: 1,
    title: 'Test Song',
    artist: 'Test Artist',
  };

  test('renders correctly', () => {
    const { getByText } = render(
      <MediaPlayer
        currentSong={song}
        isPlaying={false}
        setIsPlaying={() => {}}
        setIsLoading={() => {}}
        setSoundObject={() => {}}
        handlePlayPause={() => {}}
      />
    );
    expect(getByText(song.title)).toBeTruthy();
    expect(getByText(song.artist)).toBeTruthy();
  });

  it('toggles play/pause when the button is pressed', async () => {
    const handlePlayPause = jest.fn();
    const { getByTestId } = render(
      <MediaPlayer
        currentSong={song}
        isPlaying={false}
        setIsPlaying={() => {}}
        setIsLoading={() => {}}
        setSoundObject={() => {}}
        handlePlayPause={handlePlayPause}
      />
    );

    const playPauseButton = getByTestId('play-pause-button');

    fireEvent.press(playPauseButton);

    await waitFor(() => {
      expect(handlePlayPause).toHaveBeenCalled();
    });
  });
});
